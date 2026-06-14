/**
 * CalcHub Calculator Logic
 * All calculator functions and implementations
 */

/**
 * BMI Calculator
 */
function calculateBMI() {
    const unit = document.getElementById('bmi-unit').value;
    let bmi, category, categoryColor;
    
    if (unit === 'metric') {
        const heightCm = parseFloat(document.getElementById('bmi-height-cm').value);
        const weightKg = parseFloat(document.getElementById('bmi-weight-kg').value);
        
        if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
            showCalcError('bmi-result', 'Please enter valid height and weight values.');
            return;
        }
        
        const heightM = heightCm / 100;
        bmi = weightKg / (heightM * heightM);
    } else {
        const heightFt = parseFloat(document.getElementById('bmi-height-ft').value) || 0;
        const heightIn = parseFloat(document.getElementById('bmi-height-in').value) || 0;
        const weightLbs = parseFloat(document.getElementById('bmi-weight-lbs').value);
        
        if ((heightFt <= 0 && heightIn <= 0) || !weightLbs || weightLbs <= 0) {
            showCalcError('bmi-result', 'Please enter valid height and weight values.');
            return;
        }
        
        const totalInches = (heightFt * 12) + heightIn;
        bmi = (weightLbs / (totalInches * totalInches)) * 703;
    }
    
    // Determine category
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryColor = '#3B82F6'; // Blue
    } else if (bmi < 25) {
        category = 'Normal Weight';
        categoryColor = '#10B981'; // Green
    } else if (bmi < 30) {
        category = 'Overweight';
        categoryColor = '#F59E0B'; // Orange
    } else {
        category = 'Obese';
        categoryColor = '#EF4444'; // Red
    }
    
    const resultDiv = document.getElementById('bmi-result');
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Your BMI</p>
            <p class="result-value" style="color: ${categoryColor}">${bmi.toFixed(1)}</p>
            <div class="mt-4 inline-block px-4 py-2 rounded-full text-white font-semibold" style="background-color: ${categoryColor}">
                ${category}
            </div>
            <div class="mt-4">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(bmi, 40) * 2.5}%"></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Age Calculator
 */
function calculateAge() {
    const birthDate = document.getElementById('age-birth-date').value;
    
    if (!birthDate) {
        showCalcError('age-result', 'Please enter your date of birth.');
        return;
    }
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Calculate total days
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    
    // Next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    const resultDiv = document.getElementById('age-result');
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Your Age</p>
            <p class="result-value text-[#2563EB]">${years}</p>
            <p class="text-gray-600 mb-4">years old</p>
            
            <div class="grid grid-cols-3 gap-4 mt-6">
                <div class="bg-white rounded-lg p-3">
                    <p class="text-2xl font-bold text-[#2563EB]">${years}</p>
                    <p class="text-xs text-gray-500">Years</p>
                </div>
                <div class="bg-white rounded-lg p-3">
                    <p class="text-2xl font-bold text-[#3B82F6]">${months % 12}</p>
                    <p class="text-xs text-gray-500">Months</p>
                </div>
                <div class="bg-white rounded-lg p-3">
                    <p class="text-2xl font-bold text-[#60A5FA]">${days}</p>
                    <p class="text-xs text-gray-500">Days</p>
                </div>
            </div>
            
            <div class="mt-6 space-y-2 text-sm text-gray-600">
                <p>📅 Next Birthday: <strong>${daysUntilBirthday} days</strong></p>
                <p>📆 Total Days Lived: <strong>${formatNumber(totalDays)}</strong></p>
                <p>📅 Total Weeks Lived: <strong>${formatNumber(totalWeeks)}</strong></p>
                <p>📅 Total Months Lived: <strong>${formatNumber(totalMonths)}</strong></p>
            </div>
        </div>
    `;
}

/**
 * Percentage Calculator
 */
function calculatePercentage() {
    const mode = document.getElementById('percentage-mode').value;
    let result, formula, explanation;
    
    const resultDiv = document.getElementById('percentage-result');
    
    if (mode === 'what-is-x-of-y') {
        const percent = parseFloat(document.getElementById('perc-percent').value);
        const number = parseFloat(document.getElementById('perc-number').value);
        
        if (isNaN(percent) || isNaN(number)) {
            showCalcError('percentage-result', 'Please enter valid numbers.');
            return;
        }
        
        result = (percent / 100) * number;
        formula = `${percent}% × ${number} = ${result.toFixed(2)}`;
        explanation = `${percent}% means ${percent} out of 100. So ${percent}% of ${number} = (${percent}/100) × ${number}`;
    } else if (mode === 'x-is-what-percent-of-y') {
        const part = parseFloat(document.getElementById('perc-part').value);
        const whole = parseFloat(document.getElementById('perc-whole').value);
        
        if (isNaN(part) || isNaN(whole) || whole === 0) {
            showCalcError('percentage-result', 'Please enter valid numbers (whole cannot be zero).');
            return;
        }
        
        result = (part / whole) * 100;
        formula = `${part} ÷ ${whole} × 100 = ${result.toFixed(2)}%`;
        explanation = `${part} is ${result.toFixed(2)}% of ${whole}. This means ${part} represents ${result.toFixed(2)} out of every 100 units of ${whole}.`;
    } else if (mode === 'percent-change') {
        const oldValue = parseFloat(document.getElementById('perc-old').value);
        const newValue = parseFloat(document.getElementById('perc-new').value);
        
        if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) {
            showCalcError('percentage-result', 'Please enter valid numbers (old value cannot be zero).');
            return;
        }
        
        result = ((newValue - oldValue) / oldValue) * 100;
        const changeType = result >= 0 ? 'increase' : 'decrease';
        formula = `(${newValue} - ${oldValue}) ÷ ${oldValue} × 100 = ${Math.abs(result).toFixed(2)}%`;
        explanation = `The value changed from ${oldValue} to ${newValue}, representing a <strong>${Math.abs(result).toFixed(2)}% ${changeType}</strong>.`;
    }
    
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Result</p>
            <p class="result-value text-[#2563EB]">${typeof result === 'number' ? (mode === 'x-is-what-percent-of-y' ? result.toFixed(2) + '%' : result.toFixed(2)) : result}</p>
        </div>
        <div class="mt-6 bg-gray-50 rounded-lg p-4">
            <p class="text-sm font-semibold text-gray-700 mb-2">Formula:</p>
            <p class="text-sm text-gray-600 font-mono">${formula}</p>
        </div>
        <div class="mt-4 info-box">
            <p class="text-sm text-gray-600">${explanation}</p>
        </div>
    `;
}

/**
 * Loan Calculator
 */
function calculateLoan() {
    const principal = parseFloat(document.getElementById('loan-amount').value);
    const annualRate = parseFloat(document.getElementById('loan-rate').value);
    const years = parseFloat(document.getElementById('loan-term').value);
    
    if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || 
        principal <= 0 || annualRate < 0 || years <= 0) {
        showCalcError('loan-result', 'Please enter valid loan details.');
        return;
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    
    let monthlyPayment;
    if (monthlyRate === 0) {
        monthlyPayment = principal / numPayments;
    } else {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                         (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
    
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;
    
    const resultDiv = document.getElementById('loan-result');
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Monthly Payment</p>
            <p class="result-value text-[#2563EB]">${formatCurrency(monthlyPayment)}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mt-6">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-500">Loan Amount</p>
                <p class="text-lg font-bold text-gray-800">${formatCurrency(principal)}</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-500">Total Interest</p>
                <p class="text-lg font-bold text-gray-800">${formatCurrency(totalInterest)}</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-500">Total Payments</p>
                <p class="text-lg font-bold text-gray-800">${formatCurrency(totalPayment)}</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-500">Number of Payments</p>
                <p class="text-lg font-bold text-gray-800">${numPayments}</p>
            </div>
        </div>
        
        <div class="mt-6 info-box">
            <p class="text-sm text-gray-600">
                <strong>Loan Breakdown:</strong><br>
                • Principal: ${formatCurrency(principal)} (${((principal/totalPayment)*100).toFixed(1)}%)<br>
                • Interest: ${formatCurrency(totalInterest)} (${((totalInterest/totalPayment)*100).toFixed(1)}%)
            </p>
        </div>
    `;
}

/**
 * Mortgage Calculator
 */
function calculateMortgage() {
    const homePrice = parseFloat(document.getElementById('mortgage-price').value) || 0;
    const downPayment = parseFloat(document.getElementById('mortgage-down').value) || 0;
    const downPaymentPercent = parseFloat(document.getElementById('mortgage-down-percent').value) || 20;
    const interestRate = parseFloat(document.getElementById('mortgage-rate').value) || 0;
    const loanTerm = parseFloat(document.getElementById('mortgage-term').value) || 30;
    const propertyTax = parseFloat(document.getElementById('mortgage-tax').value) || 0;
    const insurance = parseFloat(document.getElementById('mortgage-insurance').value) || 0;
    const pmi = parseFloat(document.getElementById('mortgage-pmi').value) || 0;
    
    const actualDownPayment = downPayment > 0 ? downPayment : (homePrice * downPaymentPercent / 100);
    const loanAmount = homePrice - actualDownPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    let principalInterest;
    if (monthlyRate === 0) {
        principalInterest = loanAmount / numPayments;
    } else {
        principalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                           (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
    
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = loanAmount > (homePrice * 0.8) ? pmi : 0;
    const totalMonthly = principalInterest + monthlyTax + monthlyInsurance + monthlyPMI;
    
    const totalInterest = (principalInterest * numPayments) - loanAmount;
    
    const resultDiv = document.getElementById('mortgage-result');
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Estimated Monthly Payment</p>
            <p class="result-value text-[#2563EB]">${formatCurrency(totalMonthly)}</p>
        </div>
        
        <div class="mt-6">
            <p class="text-sm font-semibold text-gray-700 mb-3">Payment Breakdown</p>
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Principal & Interest</span>
                    <span class="font-semibold">${formatCurrency(principalInterest)}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Property Tax</span>
                    <span class="font-semibold">${formatCurrency(monthlyTax)}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Insurance</span>
                    <span class="font-semibold">${formatCurrency(monthlyInsurance)}</span>
                </div>
                ${monthlyPMI > 0 ? `
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">PMI</span>
                    <span class="font-semibold">${formatCurrency(monthlyPMI)}</span>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-200">
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p class="text-gray-500">Home Price</p>
                    <p class="font-semibold">${formatCurrency(homePrice)}</p>
                </div>
                <div>
                    <p class="text-gray-500">Down Payment</p>
                    <p class="font-semibold">${formatCurrency(actualDownPayment)} (${((actualDownPayment/homePrice)*100).toFixed(1)}%)</p>
                </div>
                <div>
                    <p class="text-gray-500">Loan Amount</p>
                    <p class="font-semibold">${formatCurrency(loanAmount)}</p>
                </div>
                <div>
                    <p class="text-gray-500">Total Interest</p>
                    <p class="font-semibold">${formatCurrency(totalInterest)}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Investment Calculator
 */
function calculateInvestment() {
    const initial = parseFloat(document.getElementById('invest-initial').value) || 0;
    const monthly = parseFloat(document.getElementById('invest-monthly').value) || 0;
    const annualReturn = parseFloat(document.getElementById('invest-return').value) || 0;
    const years = parseFloat(document.getElementById('invest-years').value) || 0;
    
    if ((initial <= 0 && monthly <= 0) || years <= 0) {
        showCalcError('invest-result', 'Please enter valid investment details.');
        return;
    }
    
    const monthlyRate = annualReturn / 100 / 12;
    const numMonths = years * 12;
    
    let futureValue = initial;
    let totalContributions = initial;
    
    for (let i = 0; i < numMonths; i++) {
        futureValue = (futureValue + monthly) * (1 + monthlyRate);
        totalContributions += monthly;
    }
    
    const totalInterest = futureValue - totalContributions;
    
    // Generate simple text-based growth chart
    let chartHtml = '<div class="mt-6"><p class="text-sm font-semibold text-gray-700 mb-3">Growth Over Time</p><div class="space-y-1 text-xs">';
    const intervals = 5;
    for (let i = 1; i <= intervals; i++) {
        const t = Math.floor((years / intervals) * i);
        const months = t * 12;
        let fv = initial;
        for (let j = 0; j < months; j++) {
            fv = (fv + monthly) * (1 + monthlyRate);
        }
        const pct = (fv / futureValue) * 100;
        chartHtml += `<div class="flex items-center gap-2"><span class="w-8">${t}y</span><div class="flex-1 bg-gray-200 rounded"><div class="bg-blue-500 rounded" style="width: ${pct}%"></div></div><span>${formatCurrency(fv)}</span></div>`;
    }
    chartHtml += '</div></div>';
    
    const resultDiv = document.getElementById('invest-result');
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Future Value</p>
            <p class="result-value text-[#2563EB]">${formatCurrency(futureValue)}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mt-6">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-500">Total Contributions</p>
                <p class="text-lg font-bold text-gray-800">${formatCurrency(totalContributions)}</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-500">Total Interest Earned</p>
                <p class="text-lg font-bold text-green-600">${formatCurrency(totalInterest)}</p>
            </div>
        </div>
        
        ${chartHtml}
        
        <div class="mt-6 info-box-success info-box">
            <p class="text-sm text-gray-600">
                <strong>Investment Summary:</strong><br>
                • Initial Investment: ${formatCurrency(initial)}<br>
                • Monthly Contribution: ${formatCurrency(monthly)}<br>
                • Time Period: ${years} years<br>
                • Annual Return: ${annualReturn}%
            </p>
        </div>
    `;
}

/**
 * Retirement Calculator
 */
function calculateRetirement() {
    const currentAge = parseInt(document.getElementById('retire-current-age').value) || 0;
    const retireAge = parseInt(document.getElementById('retire-target-age').value) || 65;
    const currentSavings = parseFloat(document.getElementById('retire-savings').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('retire-monthly').value) || 0;
    const annualReturn = parseFloat(document.getElementById('retire-return').value) || 0;
    
    if (currentAge >= retireAge) {
        showCalcError('retire-result', 'Retirement age must be greater than current age.');
        return;
    }
    
    const yearsToRetire = retireAge - currentAge;
    const monthlyRate = annualReturn / 100 / 12;
    const numMonths = yearsToRetire * 12;
    
    let retirementFund = currentSavings;
    let totalContributions = currentSavings;
    
    for (let i = 0; i < numMonths; i++) {
        retirementFund = (retirementFund + monthlyContribution) * (1 + monthlyRate);
        totalContributions += monthlyContribution;
    }
    
    const totalInterest = retirementFund - totalContributions;
    
    // Monthly retirement income (4% rule / 12)
    const monthlyIncome = (retirementFund * 0.04) / 12;
    
    const resultDiv = document.getElementById('retire-result');
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Retirement Fund at Age ${retireAge}</p>
            <p class="result-value text-[#2563EB]">${formatCurrency(retirementFund)}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mt-6">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-500">Total Contributions</p>
                <p class="text-lg font-bold text-gray-800">${formatCurrency(totalContributions)}</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-500">Interest Earned</p>
                <p class="text-lg font-bold text-green-600">${formatCurrency(totalInterest)}</p>
            </div>
        </div>
        
        <div class="mt-6 bg-green-50 rounded-lg p-4">
            <p class="text-center">
                <span class="text-sm text-gray-600">Estimated Monthly Retirement Income</span><br>
                <span class="text-2xl font-bold text-green-600">${formatCurrency(monthlyIncome)}</span><br>
                <span class="text-xs text-gray-500">(Based on 4% withdrawal rule)</span>
            </p>
        </div>
        
        <div class="mt-4 info-box">
            <p class="text-sm text-gray-600">
                <strong>Plan Summary:</strong><br>
                • Years to Retirement: ${yearsToRetire} years<br>
                • Monthly Contribution: ${formatCurrency(monthlyContribution)}<br>
                • Expected Annual Return: ${annualReturn}%
            </p>
        </div>
    `;
}

/**
 * Salary Calculator
 */
function calculateSalary() {
    const annualSalary = parseFloat(document.getElementById('salary-annual').value) || 0;
    const state = document.getElementById('salary-state').value;
    
    if (annualSalary <= 0) {
        showCalcError('salary-result', 'Please enter a valid annual salary.');
        return;
    }
    
    // Tax brackets (simplified 2024 estimates)
    const federalBrackets = [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 },
        { min: 191950, max: 243725, rate: 0.32 },
        { min: 243725, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 }
    ];
    
    const stateRates = {
        'CA': 0.0725, 'NY': 0.0685, 'TX': 0, 'FL': 0, 'WA': 0,
        'DEFAULT': 0.05
    };
    
    function calculateTax(amount, brackets) {
        let tax = 0;
        for (const bracket of brackets) {
            if (amount > bracket.min) {
                const taxableInBracket = Math.min(amount, bracket.max) - bracket.min;
                tax += taxableInBracket * bracket.rate;
            }
        }
        return tax;
    }
    
    const federalTax = calculateTax(annualSalary, federalBrackets);
    const stateRate = stateRates[state] || stateRates['DEFAULT'];
    const stateTax = annualSalary * stateRate;
    const socialSecurity = Math.min(annualSalary, 168600) * 0.062;
    const medicare = annualSalary * 0.0145;
    
    const totalTax = federalTax + stateTax + socialSecurity + medicare;
    const afterTaxSalary = annualSalary - totalTax;
    
    const hourlyRate = annualSalary / 2080;
    const weeklyPay = afterTaxSalary / 52;
    const biWeeklyPay = afterTaxSalary / 26;
    const monthlyPay = afterTaxSalary / 12;
    
    const resultDiv = document.getElementById('salary-result');
    resultDiv.innerHTML = `
        <div class="text-center mb-6">
            <p class="result-label mb-2">After-Tax Annual Salary</p>
            <p class="result-value text-[#2563EB]">${formatCurrency(afterTaxSalary)}</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div class="bg-gray-50 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-500">Hourly (Gross)</p>
                <p class="text-lg font-bold">${formatCurrency(hourlyRate)}</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-500">Weekly (Net)</p>
                <p class="text-lg font-bold">${formatCurrency(weeklyPay)}</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-500">Bi-Weekly (Net)</p>
                <p class="text-lg font-bold">${formatCurrency(biWeeklyPay)}</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-500">Monthly (Net)</p>
                <p class="text-lg font-bold">${formatCurrency(monthlyPay)}</p>
            </div>
        </div>
        
        <div class="mt-6">
            <p class="text-sm font-semibold text-gray-700 mb-3">Tax Breakdown</p>
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Federal Income Tax</span>
                    <span class="font-semibold text-red-600">-${formatCurrency(federalTax)}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">State Income Tax (${state})</span>
                    <span class="font-semibold text-red-600">-${formatCurrency(stateTax)}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Social Security</span>
                    <span class="font-semibold text-red-600">-${formatCurrency(socialSecurity)}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Medicare</span>
                    <span class="font-semibold text-red-600">-${formatCurrency(medicare)}</span>
                </div>
                <div class="flex justify-between items-center pt-2 border-t">
                    <span class="text-sm font-semibold">Total Taxes</span>
                    <span class="font-bold text-red-600">-${formatCurrency(totalTax)}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Calorie Calculator
 */
function calculateCalories() {
    const gender = document.getElementById('cal-gender').value;
    const age = parseInt(document.getElementById('cal-age').value) || 0;
    
    let heightFt = parseInt(document.getElementById('cal-height-ft').value) || 0;
    let heightIn = parseInt(document.getElementById('cal-height-in').value) || 0;
    let heightCm = parseFloat(document.getElementById('cal-height-cm').value) || 0;
    let weightLbs = parseFloat(document.getElementById('cal-weight-lbs').value) || 0;
    let weightKg = parseFloat(document.getElementById('cal-weight-kg').value) || 0;
    
    // Convert to metric if needed
    if (heightFt > 0 || heightIn > 0) {
        heightCm = ((heightFt * 12) + heightIn) * 2.54;
    }
    if (weightLbs > 0) {
        weightKg = weightLbs * 0.453592;
    }
    
    const activity = document.getElementById('cal-activity').value;
    
    if (!age || !heightCm || !weightKg) {
        showCalcError('calorie-result', 'Please enter valid details.');
        return;
    }
    
    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very_active': 1.9
    };
    
    const tdee = bmr * (activityMultipliers[activity] || 1.2);
    
    const resultDiv = document.getElementById('calorie-result');
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Daily Calorie Needs</p>
            <p class="result-value text-[#2563EB]">${Math.round(tdee)}</p>
            <p class="text-sm text-gray-500">calories/day</p>
        </div>
        
        <div class="mt-6">
            <p class="text-sm font-semibold text-gray-700 mb-3">Calorie Goals</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-blue-50 rounded-lg p-4 text-center">
                    <p class="text-xs text-blue-600 mb-1">Weight Loss</p>
                    <p class="text-xl font-bold text-blue-600">${Math.round(tdee - 500)}</p>
                    <p class="text-xs text-gray-500">-500 cal/day</p>
                </div>
                <div class="bg-green-50 rounded-lg p-4 text-center border-2 border-green-200">
                    <p class="text-xs text-green-600 mb-1">Maintenance</p>
                    <p class="text-xl font-bold text-green-600">${Math.round(tdee)}</p>
                    <p class="text-xs text-gray-500">maintain weight</p>
                </div>
                <div class="bg-orange-50 rounded-lg p-4 text-center">
                    <p class="text-xs text-orange-600 mb-1">Weight Gain</p>
                    <p class="text-xl font-bold text-orange-600">${Math.round(tdee + 500)}</p>
                    <p class="text-xs text-gray-500">+500 cal/day</p>
                </div>
            </div>
        </div>
        
        <div class="mt-6 info-box">
            <p class="text-sm text-gray-600">
                <strong>Your BMR (Basal Metabolic Rate):</strong> ${Math.round(bmr)} calories/day<br>
                <span class="text-xs">BMR is the number of calories your body burns at rest.</span>
            </p>
        </div>
    `;
}

/**
 * Date Difference Calculator
 */
function calculateDateDiff() {
    const startDate = document.getElementById('date-start').value;
    const endDate = document.getElementById('date-end').value;
    
    if (!startDate || !endDate) {
        showCalcError('date-result', 'Please select both start and end dates.');
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
        showCalcError('date-result', 'End date must be after start date.');
        return;
    }
    
    const diffTime = end - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44); // Average days per month
    const diffYears = Math.floor(diffDays / 365.25);
    
    // More precise month/year calculation
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    if (days < 0) {
        months--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Day of week
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][start.getDay()];
    const endDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][end.getDay()];
    
    const resultDiv = document.getElementById('date-result');
    resultDiv.innerHTML = `
        <div class="text-center">
            <p class="result-label mb-2">Time Between Dates</p>
            <p class="text-3xl font-bold text-[#2563EB]">${years} years, ${months} months, ${days} days</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-[#2563EB]">${diffDays}</p>
                <p class="text-sm text-gray-500">Days</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-[#3B82F6]">${diffWeeks}</p>
                <p class="text-sm text-gray-500">Weeks</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-[#60A5FA]">${Math.round(diffDays / 30)}</p>
                <p class="text-sm text-gray-500">Months (approx)</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-[#93C5FD]">${years}</p>
                <p class="text-sm text-gray-500">Years</p>
            </div>
        </div>
        
        <div class="mt-6 grid grid-cols-2 gap-4">
            <div class="bg-blue-50 rounded-lg p-4">
                <p class="text-sm text-gray-500">Start Date</p>
                <p class="font-semibold">${start.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p class="text-xs text-gray-400">${dayOfWeek}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-4">
                <p class="text-sm text-gray-500">End Date</p>
                <p class="font-semibold">${end.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p class="text-xs text-gray-400">${endDayOfWeek}</p>
            </div>
        </div>
        
        <div class="mt-4 text-center text-sm text-gray-500">
            <p>Total working days (Mon-Fri): <strong>${Math.floor(diffDays * 5/7)}</strong></p>
        </div>
    `;
}

/**
 * Show calculation error
 */
function showCalcError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <p class="font-semibold">⚠️ Error</p>
                <p class="text-sm">${message}</p>
            </div>
        `;
    }
}

/**
 * Switch percentage calculator mode
 */
function switchPercentageMode(mode) {
    const sections = {
        'what-is-x-of-y': 'perc-section-1',
        'x-is-what-percent-of-y': 'perc-section-2',
        'percent-change': 'perc-section-3'
    };
    
    // Hide all sections
    Object.values(sections).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    // Show selected section
    const selected = document.getElementById(sections[mode]);
    if (selected) selected.style.display = 'block';
    
    // Update toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) btn.classList.add('active');
    });
    
    // Clear result
    document.getElementById('percentage-result').innerHTML = '';
}

/**
 * Switch BMI unit
 */
function switchBmiUnit(unit) {
    const metricInputs = document.getElementById('bmi-metric-inputs');
    const imperialInputs = document.getElementById('bmi-imperial-inputs');
    
    if (unit === 'metric') {
        metricInputs.style.display = 'block';
        imperialInputs.style.display = 'none';
    } else {
        metricInputs.style.display = 'none';
        imperialInputs.style.display = 'block';
    }
    
    // Update toggle buttons
    document.querySelectorAll('[data-bmi-unit]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.bmiUnit === unit) btn.classList.add('active');
    });
    
    // Clear result
    document.getElementById('bmi-result').innerHTML = '';
}

/**
 * Switch calorie unit
 */
function switchCalorieUnit(unit) {
    const metricInputs = document.getElementById('cal-metric-inputs');
    const imperialInputs = document.getElementById('cal-imperial-inputs');
    
    if (unit === 'metric') {
        metricInputs.style.display = 'block';
        imperialInputs.style.display = 'none';
    } else {
        metricInputs.style.display = 'none';
        imperialInputs.style.display = 'block';
    }
    
    document.querySelectorAll('[data-cal-unit]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.calUnit === unit) btn.classList.add('active');
    });
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}
