import * as SQLite from 'expo-sqlite';
import { Place } from '../models/places';

let database;

// Veritabanını async olarak açma
async function openDatabase() {
    database = await SQLite.openDatabaseAsync('places.db');
}

export async function init() {
    try {
        // Veritabanını başlat
        await openDatabase();
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            );
        `);
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing the database:', err);
        throw err;
    }
}

export async function insertPlace(place) {
    try {
        await openDatabase();
        const result = await database.runAsync(
            `
                INSERT INTO places (title, imageUri, address, lat, lng)
                VALUES (?, ?, ?, ?, ?)
            `,
            place.title,
            place.imageUri,
            place.address,
            place.location.lat,
            place.location.lng
        );
        return result.lastInsertRowId;
    } catch (err) {
        console.error('Error inserting place:', err);
        throw err;
    }
}

export async function fetchPlaces() {
    try {
        await openDatabase();
        const result = await database.getAllAsync('SELECT * FROM places');
        const places = result.map(dp => new Place(
            dp.title,
            dp.imageUri,
            {
                address: dp.address,
                lat: dp.lat,
                lng: dp.lng,
            },
            dp.id
        ));
        return places;
    } catch (err) {
        console.error('Error fetching places:', err);
        throw err;
    }
}

export async function fetchPlaceDetails(id) {
    try {
        await openDatabase();
        const dbPlace = await database.getFirstAsync(
            'SELECT * FROM places WHERE id = ?',
            [id]
        );
        if (!dbPlace) {
            throw new Error('Place not found');
        }
        const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address },
            dbPlace.id
        );
        return place;
    } catch (err) {
        console.error('Error fetching place details:', err);
        throw err;
    }
}
