import type {Metadata} from 'next'
import RegisterForm from '@/components/forms/register';
import {fetchPagesData} from "@/services/wordpress";
import {pagesIds} from "@/lib/pages/page-ids";
import Header from "@/app/auth/_components/header";

export const metadata: Metadata = {
    title: 'Εγγραφή | vSpot - All about Volos',
    description: '...',
}

const RegisterPage = async () => {
    const authPageData = await fetchPagesData(pagesIds.auth.id);
    return (
        <>
            <Header title={authPageData.acf.register_title} content={authPageData.acf.register_text}/>
            <div>
                <RegisterForm/>
            </div>
        </>
    );
};

export default RegisterPage;