const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Autorise votre frontend (HTML/React/Vue) à communiquer avec ce backend
app.use(cors());
app.use(express.json());

// --- DONNÉES FICTIVES DE DÉPART (MOCK DATA) ---
let produits = [
    { id: 1, nom: "Manioc", quantite: "500 kg", prix: "300 FCFA/kg", localite: "Dschang", image: "https://placehold.co/150" },
    { id: 2, nom: "Tomates fraîches", quantite: "12 paniers", prix: "5000 FCFA/panier", localite: "Obala", image: "https://placehold.co/150" }
];

// --- ROUTES DE L'API ---

// 1. Accueil de l'API
app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API Maquette d'AgroTech Africa !");
});

// 2. Récupérer tous les produits (Pour l'écran de l'acheteur)
app.get('/api/produits', (req, res) => {
    res.json(produits);
});

// 3. Ajouter un produit (Pour l'écran de l'agriculteur)
app.post('/api/produits', (req, res) => {
    const { nom, quantite, prix, localite } = req.body;
    
    const nouveauProduit = {
        id: produits.length + 1,
        nom,
        quantite,
        prix,
        localite,
        image: "https://placehold.co/150" // Image par défaut pour la maquette
    };
    
    produits.push(nouveauProduit);
    res.status(201).json({ message: "Produit ajouté avec succès !", produit: nouveauProduit });
});

// 4. Simuler un paiement Mobile Money (Orange Money / MTN / Wave...)
app.post('/api/paiement', (req, res) => {
    const { telephone, montant } = req.body;
    
    if (!telephone || !montant) {
        return res.status(400).json({ erreur: "Téléphone et montant requis" });
    }

    // On simule une attente de 1,5 seconde (comme le vrai réseau) puis on valide
    setTimeout(() => {
        res.json({
            statut: "SUCCÈS",
            transactionId: "TX-" + Math.floor(Math.random() * 900000 + 100000),
            message: `Le paiement de ${montant} a été validé avec succès sur le numéro ${telephone}.`
        });
    }, 1500);
});

// --- DÉMARRAGE DU SERVEUR ---
app.listen(PORT, () => {
    console.log(`Maquette Backend lancée sur http://localhost:${PORT}`);
});
