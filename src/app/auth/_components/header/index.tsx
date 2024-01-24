const Header = ({title, content}: { title: string, content: string }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    );
};

export default Header;