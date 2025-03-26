

export const trimAndCheck = (text) => {
    // ลบช่องว่างทั้งหน้าและหลังข้อความ
    return text.trim();
};

export const checkTrimmedText = (selector, expectedText) => {
    cy.get(selector).then(($el) => {
        const trimmedText = trimAndCheck($el.text());
        expect(trimmedText,{timeout:200000}).to.equal(expectedText);
    });
};

export const getSalePriceProduct = async (page, index, qty) => {
    const text = await page.locator(`[data-cy="text-include-vat-saleunit-price-${index}"]`).textContent();
    if (!text) return '0.00'; 

    const price = convertStringToNumber(text);
    const totalPrice = (price * qty).toFixed(2);
    return parseFloat(totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const getBasePriceProduct = async (page, index, qty) => {
    const text = await page.locator(`[data-cy="text-include-vat-baseunit-price-${index}"]`).textContent();
    if (!text) return '0.00'; 

    const price = convertStringToNumber(text);
    const totalPrice = (price * qty).toFixed(2);
    return parseFloat(totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};




export const convertStringToNumber =( text) => {
    return Number(text.replaceAll(',', ''));
};


