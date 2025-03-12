

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

