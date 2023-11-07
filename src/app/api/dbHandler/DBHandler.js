import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class DBHandler {
  async getAbout() {
    try {
      const data = await prisma.student.findMany();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error load about info");
    }
  }

  async handleCompile(req) {
    try {
      const { script } = await req.json();
      // Asegúrate de que el script esté escrito en Prolog y siga su sintaxis.
      const prologScript = `${script}.`;
      console.log(prologScript);
      
      // Realizar una solicitud HTTP POST
      const response = await fetch('http://localhost:8000/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
        },
        body: JSON.stringify({ script: prologScript }),
      });
  
      if (response.ok) {
        // Si la solicitud fue exitosa, obtener la respuesta en formato JSON
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        // Manejar errores de solicitud
        console.error('Error en la solicitud: ', response.status);
        throw new Error("Error trying to compile");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error trying to compile");
    }
  }
  
    async handleEval(scriptId) {
      try {
        // Usa Prisma para buscar el script por su ID en la base de datos
        const evaluation = await prisma.eval.findUnique({
          where: {
            id_eval: scriptId,
          },
        });
        if (evaluation) {
          return evaluation.result;
        } else {
          throw new Error('Eval not found');
        }
      } catch (error) {
        console.error(error);
        throw new Error('Error evaluating result');
      }
    }
  
  
  

  async getKeywords() {
    try {
      const data = await prisma.keyword.findMany();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting keywords");
    }
  }

  async handleLoad(id) {
    try {
      // Usa Prisma para buscar el script por su ID en la base de datos
      const script = await prisma.script.findUnique({
        where: {
          id_script: id,
        },
      });
      if (script) {
        return script;
      } else {
        throw new Error('Script not found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error loading script');
    }
  }

  // Función para guardar un nuevo script en la base de datos
async createScript(description, script) {
  try {
    const newScript = await prisma.script.create({
      data: {
        description:description,
        script:script,
      },
    });
    return newScript;
  } catch (error) {
    console.error(error);
    throw new Error("Error saving script");
  }
}

// Función para actualizar un script existente en la base de datos
async  updateScript(id_script,description,script) {
  try {
    const updatedScript = await prisma.script.update({
      where: {
        id_script: id_script,
      },
      data: {
        script:script,
        description:description,
      },
    });
    return updatedScript;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating script");
  }
}


  async getScripts() {
    try {
      const data = await prisma.script.findMany();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error loading scripts");
    }
  }

  async getScriptById(id) {
    try {
      const script = await prisma.script.findUnique({
        where: { id_script: id },
      });
      if (script) {
        return script; // Devuelve el script como objeto
      } else {
        return null; // O devuelve null si no se encuentra el script
      }
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }
}

export default DBHandler;
