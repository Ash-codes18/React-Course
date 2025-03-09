import atom from "../assets/react-core-concepts.png";

const reactDesc = ["Fundamental", "Core", "Crucial"]

const getRandomIndex = () => {
  return Math.floor(Math.random() * reactDesc.length);
}


const Header = () =>{
    const description = reactDesc[getRandomIndex()];
    return (
        <>
            <header>
            <img src={atom} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
            {description} React concepts you will need for almost any app you are
            going to build!
            </p>
            </header>
            <main>
                <h2>Time to get started!</h2>
            </main>
        </>
    );
}

export default Header;

