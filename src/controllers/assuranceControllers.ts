import Assurance from "../models/assuraneModels";
import { Request, Response } from "express";

//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================

export async function createAssurance(req: Request, res: Response) {
    try {
        // Champs requis
        const { vehicule_id, assureur, numero_police, type_assurance, date_debut, date_fin, cout_annuel } = req.body;

        // Vérification des champs obligatoires
            if (!vehicule_id || !numero_police) {
                res.status(400).json({ message: "Les champs Id du véhicule et le numéro de police sont obligatoires !" });
                return
            }

        // Création d'un nouveau contrat d'assurance
        const newAssurance = await Assurance.create({
            vehicule_id,
            assureur,
            numero_police,
            type_assurance,
            date_debut,
            date_fin,
            cout_annuel            
        });

        const assuranceResponse = newAssurance;
        res.status(200).json({message:'Contrat d\'assurance créé avec succès !', assuranceResponse});
             
        } catch (err: any) {
            console.log(err.message);
            if (err.name === "SequelizeUniqueConstraintError") {
                 res.status(400).json({ message: "Erreur Erreur Erreur !!!" });
                return
            }
        console.error("Erreur lors de l'ajout :", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
}

export async function updateAssurance (req: Request, res: Response) {
    const { id } = req.params;
    const { vehicule_id, assureur, numero_police, type_assurance, date_debut, date_fin, cout_annuel } = req.body;

    try {
        const assurance = await Assurance.findByPk(id);
        if (!assurance) {
            res.status(404).json({ message: "Contrat d\'assurance non trouvé !" });
            return 
        }
        
        await assurance.update({ vehicule_id, assureur, numero_police, type_assurance, date_debut, date_fin, cout_annuel });
        res.status(200).json({ message: "Contrat d\'assurance mis à jour avec succès !" });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export async function deleteAssurance(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const assurance = await Assurance.findOne({ where: { id } });
        if (!assurance) {
            res.status(404).json({ message: "Contrat d\'assurance non trouvé !" });
            return 
        }

        await assurance.destroy();
        res.status(200).json({ message: "Contrat d\'assurance supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export const getAllAssurance = async (req: Request, res: Response) => {
    try {
      const assurances = await Assurance.findAll(); // Exemple avec Sequelize
      res.status(200).json(assurances);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };
