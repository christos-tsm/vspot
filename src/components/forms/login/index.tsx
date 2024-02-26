'use client';

import React, { useState } from 'react';
import { registerUser } from "@/services/user";
import styles from '../forms.module.scss';

interface FormData {
    username: string;
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, email, password } = formData;

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
        <div className={styles.container}>
            <form className={styles.authform} onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} placeholder="Username" />
                <input type="email" name="email" onChange={handleChange} placeholder="email" />
                <input type="password" name="password" onChange={handleChange} />
                <input type="password" name="passwordRepeat" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default LoginForm;
