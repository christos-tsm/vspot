'use client';

import React, { useState } from 'react';
import { registerUser } from "@/services/user";
import styles from '../forms.module.scss';
import Button from '@/components/common/forms/button';
import SectionTitle from '@/components/common/typograhpy/sectionTitle';
import Link from 'next/link';

interface FormData {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

const RegisterForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, email, password, passwordRepeat } = formData;

        // Basic client-side validation
        if (password !== passwordRepeat) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Ο κωδικός σας πρέπει να περιέχει τουλάχιστον 6 χαρακτήρες');
            return;
        }

        try {
            const response = await registerUser(username, email, password);
        } catch (error: any) {
            if (error.response.data.code === 'user_exists') {
                setErrorMessage('Υπάρχει ήδη εγγεγραμένος χρήστης με αυτά τα στοιχεία');
            } else {
                setErrorMessage('Προέκυψε σφάλμα κατα την εγγραφή σας, παρακαλούμε προσπαθήστε αργότερα');
                console.log(error);
            }
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={`${styles.formTitle} sectionSubTitle`}>Δημιουργία λογαριασμού</h2>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <div className={styles.inputContainer}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" autoComplete='username' onChange={handleChange} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" autoComplete='email' onChange={handleChange} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="password">Κωδικός</label>
                    <input type="password" id="password" name="password" onChange={handleChange} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="passwordRepeat">Επιβεβαίωση κωδικού</label>
                    <input type="password" id="passwordRepeat" name="passwordRepeat" onChange={handleChange} />
                </div>
                <Button type="submit" variation="primary">Εγγραφή</Button>
                <p>Έχετε ήδη λογαριασμό? Συνδεθείτε <Link href='/auth/login'>εδώ</Link></p>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default RegisterForm;
