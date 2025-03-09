import Cards from './cards';
import { CORE_CONCEPTS } from './Data';

const CoreConcept = () => {
    return (  
        <>
            <main>
            <section id="core-concepts">
            <h2>Core concepts</h2>
            <ul>
                {CORE_CONCEPTS.map((item) => (
                    <Cards key={item.title} {...item}/>
                ))}
            </ul>
            </section>
            </main>
        </>
    );
}
 
export default CoreConcept;