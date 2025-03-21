import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Adjust the path to your database configuration file


// Définition des attributs d'un Controle Technique
interface ControleAttributes {
    id?: number;
    vehicule_id?: number;
    date_controle?: Date;
    kilometrage_controle?: number;
    controleur?: string;
    resultat?: string;
    cout?: number;
    prochain_controle?: Date;
    observation?: string;
    }

// Définition de la classe Controle Technique
class Controle extends Model<ControleAttributes> implements ControleAttributes {
    public id!: number;
    public vehicule_id!: number;
    public date_controle!: Date;
    public kilometrage_controle!: number;
    public controleur!: string;
    public resultat!: string;
    public cout!: number;
    public prochain_controle!: Date;
    public observation!: string;
    
}

// Initialisation du modèle Controle Technique et création dans la BDD
Controle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vehicule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'vehicules',
                key: 'id',
            },
        },
        date_controle: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        kilometrage_controle: {
            type: DataTypes.INTEGER,    
            allowNull: false,
        },
        controleur:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        resultat:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        cout:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: {min: 0.00},
        },
        prochain_controle:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        observation:{
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "controles",
        timestamps: true,
    }
);

export default Controle;

