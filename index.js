import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
export const connection = new Pool({
	connectionString: process.env.DATABASE_URL,
});

async function getRepos() {
    const { rows: repos } = await connection.query(
			'SELECT * FROM repositories r WHERE r."hasSponsorship"=true'
		);
    
    return repos;
}

const repos = await getRepos();
const reposJSON = JSON.stringify(repos);

fs.writeFileSync('sponsored - repos.json', reposJSON);