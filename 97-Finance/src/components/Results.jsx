import {calculateInvestmentResults, formatter} from '../util/investment'

const Results = ({input}) => {
    const results = calculateInvestmentResults(input);
    const initialInvestment = input.initialInvestment;
    return (
        <table id='result' className='center'>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment</th>
                    <th>Interest</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {results.map((yearData) => {
                        const totalInterest = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - initialInvestment;
                        const totalInvestment = yearData.annualInvestment * yearData.year + initialInvestment;
                        return (
                            <tr key={yearData.year}>
                                <td>{yearData.year}</td>
                                <td>{formatter.format(yearData.valueEndOfYear)}</td>
                                <td>{formatter.format(yearData.interest)}</td>
                                <td>{formatter.format(totalInterest)}</td>
                                <td>{formatter.format(totalInvestment)}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
 
export default Results;