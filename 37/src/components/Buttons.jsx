import { useState } from 'react';
import TabButton from './tabButton'
import { EXAMPLES } from './Data';
import Section from './Section';

const Buttons = () => {
    const [tabContent, setTabContent] = useState('');
    
    const handleClick = (selectedButton) => {
        setTabContent(selectedButton);
    }

    return ( 
        
        <>
            <Section title="Examples" id="examples">
            <menu>
            <TabButton isSelected={tabContent === 'components'} onClick={() => handleClick('components')}>Components</TabButton>
            <TabButton isSelected={tabContent === 'jsx'} onClick={() => handleClick('jsx')}>JSX</TabButton>
            <TabButton isSelected={tabContent === 'props'} onClick={() => handleClick('props')}>Props</TabButton>
            <TabButton isSelected={tabContent === 'state'} onClick={() => handleClick('state')}>State</TabButton>
            </menu>
                {tabContent ? 
                    <div id="tab-content">
                <h3>{EXAMPLES[tabContent].title}</h3>
                <p>{EXAMPLES[tabContent].description}</p>
                <pre>
                    <code>
                        {EXAMPLES[tabContent].code}
                    </code>
                </pre>
            </div>

            :   <p>Click on a tab to view the content</p>
                
                }
            </Section>
        </>
    );
}
 
export default Buttons; 