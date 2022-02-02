const bcrypt = require('bcrypt');

// 1234 -> abcd
// but most importantly
// abcd -/> 1234

async function run() {
	const salt = await bcrypt.genSalt(10);
	const hashedPw = await bcrypt.hash('1234', salt);
	console.log(`Salt: ${salt}\nHashed password: ${hashedPw}`);
}

run();
