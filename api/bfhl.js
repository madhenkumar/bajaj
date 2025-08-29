export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      is_success: false,
      error: "Only POST requests are allowed"
    });
  }

  try {

    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. Expected { data: [...] }"
      });
    }

    const { data } = req.body;

    const student_name = "madhen_doe";   
    const birthdate = "20092004";        
    const email_id = "madhen@xyz.com";   
    const roll_no = "22BCE0123";         

    const odds = [];
    const evens = [];
    const letters = [];
    const specials = [];
    let total = 0;

    for (const token of data) {
      if (/^-?\d+$/.test(token)) {
        const n = Number(token);
        total += n;
        (n % 2 === 0 ? evens : odds).push(token);
      } else if (/^[a-zA-Z]+$/.test(token)) {
        letters.push(token.toUpperCase());
      } else {
        specials.push(token);
      }
    }

    const reversedCaps = letters
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 ? ch.toLowerCase() : ch.toUpperCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${student_name}_${birthdate}`,
      email: email_id,
      roll_number: roll_no,
      odd_numbers: odds,
      even_numbers: evens,
      alphabets: letters,
      special_characters: specials,
      sum: total.toString(),
      concat_string: reversedCaps
    });
  } catch (error) {

    return res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
}