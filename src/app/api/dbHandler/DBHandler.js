const fs = require("fs");
const path = require("path");
class DBHandler {
  async getAbout() {
    try {
      const filePath = path.join(process.cwd(), "public", "about.json");
      const fileContent = await fs.promises.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      return data;
    } catch (error) {
      console.log(error)
      throw new Error("Error load about info");
    }
  }

  async handleCompile(req) {
    try {
      const data = await req.json();
      const timestampedText = `Echo from server at ${new Date().toISOString()}\n${
        data.text
      } `;
      return timestampedText;
    } catch (error) {
      console.log(error)
      throw new Error("Error trying to compile");
    }
  }

  async handleEval(id){
    try{
      const filePath = path.join(process.cwd(), "public", `T${id}.txt`);
      const fileContent = await fs.promises.readFile(filePath, "utf-8");
      return fileContent;
    }catch(error){
      console.log(error)
      throw new Error('Error trying to eval');
    }
  }

  async getKeywords(){
    try {
      const filePath = path.join(process.cwd(), "public", "keywords.json");
      const fileContent = await fs.promises.readFile(filePath, "utf-8");
      const data=JSON.parse(fileContent);
      return data;
    } catch (error) {
      console.log(error)
      throw new Error('Error getting keywords');
    }
  }

  async handleLoad(id){
    try {
      // Leer el archivo JSON actual si existe
      const filePath = path.join(process.cwd(), "public", "scripts.json");
      let existingScripts = [];
  
      try {
        existingScripts = await fs.promises.readFile(filePath, "utf-8");
        existingScripts = JSON.parse(existingScripts);
        const script=existingScripts.find(e=>e.id===id);
        return script;
      } catch (readError) {
        // El archivo aún no existe o no se pudo leer, lo manejaremos como un array vacío.
        console.error(readError)
        throw new Error('The file doesn\'t exist')
      }
  
    } catch (error) {
      console.error(error);
      throw new Error('Error load script');
    }
  }

  async handleSave(text,script){
    try {
      // Leer el archivo JSON actual si existe
      const filePath = path.join(process.cwd(), "public", "scripts.json");
      let existingScripts = [];
  
      try {
        existingScripts = await fs.promises.readFile(filePath, "utf-8");
        existingScripts = JSON.parse(existingScripts);
      } catch (readError) {
        // El archivo aún no existe o no se pudo leer, lo manejaremos como un array vacío.
        console.log(readError)
        throw new Error('The file doesn\'t read')
      }
  
      // Generar un nuevo ID
      const id = existingScripts.length + 1;
  
      // Extraer el nombre del script (primera línea antes del salto de línea)
      const scriptMes = script.split("\0")[0].trim();
  
      // Crear el nuevo script en el formato deseado
      const newScript = {
        id,
        text,
        script:scriptMes,
      };
  
      // Agregar el nuevo script al array
      existingScripts.push(newScript);
  
      // Escribir el array actualizado en el archivo JSON
      await fs.promises.writeFile(filePath, JSON.stringify(existingScripts, null, 2));
  
      return existingScripts;
    } catch (error) {
      console.error(error);
      throw new Error('Error save script');
    }
  }
  
  async getScripts(){
    try {
      const filePath = path.join(process.cwd(), "public", "scripts.json");
      const fileContent = await fs.promises.readFile(filePath, "utf-8");
      const data=JSON.parse(fileContent);
      return data;
    } catch (error) {
      console.log(error)
      throw new Error('Error loading scripts');
    }
  }

  async getScriptById(id){
    try {
      // Cargar los scripts desde scripts.json
      const scriptsFilePath = path.join(process.cwd(), "public", "scripts.json");
      const scripts = JSON.parse(await fs.readFile(scriptsFilePath, "utf-8"));
  
      // Buscar el script por ID en scripts.json
      const script = scripts.find((script) => script.id === parseInt(id, 10));
      if (script) {
        return NextResponse.json({data: script }); // Devuelve el script como JSON
      } else {
        return NextResponse.json({ message: 'Script not found' }, { status: 404 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
}

export default DBHandler;