export const validateIsraeliID = (id) => {
    let strId = String(id).trim();
  
    if (strId.length > 9 || isNaN(strId)) return false; // ID too long or contains non-numeric characters
  
    // Pad string with zeros up to 9 digits
    strId = strId.padStart(9, '0');
  
    let total = 0;
    for (let i = 0; i < 9; i++) {
      let char = parseInt(strId[i], 10);
      if (i % 2 === 1) { // Multiply every second digit by 2
        char *= 2;
        if (char > 9) {
          char -= 9;
        }
      }
      total += char;
    }
  
    // Valid if total sum is divisible by 10
    return total % 10 === 0;
  }
  