window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcomeOverlay');

    setTimeout(() => {
        if (overlay) {
            overlay.classList.add('fade-out');
        }
    }, 1500); 
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAmdmYOMGLRJTLfo2PyIZ4t88J0mbCSCAo",
    authDomain: "encuesta-birthday.firebaseapp.com",
    projectId: "encuesta-birthday",
    storageBucket: "encuesta-birthday.firebasestorage.app",
    messagingSenderId: "1043924473238",
    appId: "1:1043924473238:web:8a10a1bad111d4830e39b7",
    measurementId: "G-LBG0YRPNSY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    
    const form = document.getElementById('rsvpForm');
    const thankYouBox = document.getElementById('thankYou');
    const confirmationText = document.getElementById('confirmationText');
    
    const btnSubmit = form.querySelector('.btn-submit');
    if(btnSubmit) btnSubmit.disabled = true;

    try {
        await addDoc(collection(db, "invitados"), {
            nombre: name,
            asistencia: attendance,
            fechaRegistro: new Date()
        });

        form.classList.add('hidden');
        thankYouBox.classList.remove('hidden');
        
        if(attendance === 'si') {
            confirmationText.innerHTML = `¡Genial, <strong>${name}</strong>! Nos vemos pronto para celebrar en grande. 🥳✨`;
        } else {
            confirmationText.innerHTML = `Lamentamos que no puedas venir, <strong>${name}</strong>. ¡Te extrañaremos en la fiesta!`;
        }

    } catch (error) {
        console.error("Error al guardar en Firebase: ", error);
        alert("Hubo un pequeño problema al guardar tu respuesta. Por favor, intenta de nuevo.");
        
        if(btnSubmit) btnSubmit.disabled = false; 
    }
});
