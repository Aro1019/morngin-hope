/* Route API - Envoyer un message de contact via Resend */
/* Reçoit les données du formulaire et envoie un email */
/* Sécurité : échappement HTML, validation de type, rate limiting basique */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

/* Instance Resend avec la clé API */
const resend = new Resend(process.env.RESEND_API_KEY || '');

/* Rate limiting simple en mémoire (par IP) */
const tentativesParIP = new Map<string, { compteur: number; derniereRequete: number }>();
const LIMITE_REQUETES = 5; /* max 5 messages */
const FENETRE_MS = 15 * 60 * 1000; /* par fenêtre de 15 minutes */

/* Vérifier le rate limiting */
function verifierRateLimit(ip: string): boolean {
  const maintenant = Date.now();
  const entree = tentativesParIP.get(ip);

  if (!entree || maintenant - entree.derniereRequete > FENETRE_MS) {
    tentativesParIP.set(ip, { compteur: 1, derniereRequete: maintenant });
    return true;
  }

  if (entree.compteur >= LIMITE_REQUETES) {
    return false;
  }

  entree.compteur++;
  return true;
}

/* Validation d'email stricte */
function estEmailValide(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/* Vérifier qu'une valeur est bien une chaîne non vide */
function estChaineValide(valeur: unknown): valeur is string {
  return typeof valeur === 'string' && valeur.trim().length > 0;
}

/* Échappement HTML pour prévenir les injections XSS dans l'email */
function echapperHTML(texte: string): string {
  return texte
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/* Nettoyage des entrées utilisateur */
function nettoyer(texte: string): string {
  return echapperHTML(texte.trim().slice(0, 5000));
}

export async function POST(requete: NextRequest) {
  try {
    /* Vérification du rate limiting */
    const ip = requete.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnu';
    if (!verifierRateLimit(ip)) {
      return NextResponse.json(
        { erreur: 'Trop de requêtes. Veuillez patienter avant de réessayer.' },
        { status: 429 }
      );
    }

    const corps = await requete.json();
    const { nom, email, sujet, message } = corps;

    /* Validation des types — chaque champ doit être une chaîne non vide */
    if (!estChaineValide(nom) || !estChaineValide(email) || !estChaineValide(sujet) || !estChaineValide(message)) {
      return NextResponse.json(
        { erreur: 'Tous les champs sont obligatoires et doivent être du texte.' },
        { status: 400 }
      );
    }

    /* Validation de l'email */
    if (!estEmailValide(email)) {
      return NextResponse.json(
        { erreur: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    /* Validation des longueurs maximales */
    if (nom.length > 200 || sujet.length > 300 || message.length > 5000) {
      return NextResponse.json(
        { erreur: 'Un ou plusieurs champs dépassent la longueur maximale autorisée.' },
        { status: 400 }
      );
    }

    /* Nettoyage et échappement des données */
    const nomNettoye = nettoyer(nom);
    const sujetNettoye = nettoyer(sujet);
    const messageNettoye = nettoyer(message);
    const emailNettoye = email.trim().slice(0, 254);

    /* Envoi de l'email via Resend */
    await resend.emails.send({
      from: 'Morning Hope <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'contact@morninghope.org',
      subject: `[Contact] ${sujetNettoye}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${nomNettoye}</p>
        <p><strong>Email :</strong> ${echapperHTML(emailNettoye)}</p>
        <p><strong>Sujet :</strong> ${sujetNettoye}</p>
        <hr />
        <p>${messageNettoye.replace(/\n/g, '<br />')}</p>
      `,
      replyTo: emailNettoye,
    });

    return NextResponse.json({ succes: true });
  } catch (erreur) {
    console.error('Erreur Resend:', erreur);
    return NextResponse.json(
      { erreur: "Erreur lors de l'envoi du message." },
      { status: 500 }
    );
  }
}
