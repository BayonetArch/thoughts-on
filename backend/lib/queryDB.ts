export default async function queryDB(query: string) {
  const result = await db.query(query);
}
