import sql from 'mssql'

const dbSettings = {
    user: 'DBAdmin',
    password: 'root',
    server: 'localhost',
    database: 'OFSDB',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

export const getConnection = async () => {
    const pool = await  sql.connect(dbSettings)
    return pool
};

