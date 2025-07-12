const cursos = [
  [1, "Matemática I", "mat1", []],
  [1, "Laboratorio de Química General", "labquimica", []],
  [1, "Química General", "quimica", []],
  [1, "Individuo y Medio Ambiente", "medioamb", []],
  [1, "Introducción a la Vida Universitaria", "ivu", []],
  [1, "Inglés I", "ingles1", []],
  [1, "Comprensión y Redacción de Textos I", "redaccion1", []],
  
  [2, "Estadística Descriptiva y Probabilidades", "estadistica1", ["mat1"]],
  [2, "Problemas y Desafíos del Perú Actual", "problemas", ["medioamb", "redaccion1"]],
  [2, "Matemática II", "mat2", ["mat1"]],
  [2, "Inglés II", "ingles2", ["ingles1"]],
  [2, "Comprensión y Redacción de Textos II", "redaccion2", ["redaccion1"]],  
  [2, "Introducción a las TIC", "tic", ["ivu"]],
  [2, "Principios de Algoritmos", "algoritmos", []],

  [3, "Estadística Inferencial", "estadistica2", ["estadistica1"]],
  [3, "Cálculo I", "calculo1", ["mat2"]],
  [3, "Laboratorio de Mecánica Clásica", "labmecanica", ["mat2"]],
  [3, "Mecánica Clásica", "mecanica", ["mat2"]],
  [3, "Inglés III", "ingles3", ["ingles2"]],
  [3, "Ciudadanía y Reflexión Ética", "etica", ["medioamb", "redaccion1"]],
  [3, "Teoría General de Sistemas", "sistemas", ["tic"]],
  [3, "Taller de Programación", "prog", ["algoritmos", "tic"]],

  [4, "Cálculo II", "calculo2", ["calculo1"]],
  [4, "Laboratorio de Fundamentos de Electromagnetismo", "labelectro", ["mecanica", "calculo1", "labmecanica"]],
  [4, "Fundamentos de Electromagnetismo", "electro", ["mecanica", "calculo1", "labmecanica"]],
  [4, "Investigación Académica", "investigacion", ["medioamb", "redaccion1"]],
  [4, "Inglés IV", "ingles4", ["ingles3"]],
  [4, "Arquitectura de Computadoras", "arqui", ["prog"]],
  [4, "Programación Orientada a Objetos", "poo", ["prog"]],
  [4, "Base de Datos", "bd", ["prog"]],
  

  [5, "Redes y Comunicación de Datos I", "redes1", ["arqui"]],
  [5, "Administración y Organización de Empresas", "admi", []],
  [5, "Herramientas Informáticas para la Toma de Decisiones", "herramientas", []],
  [5, "Procesos para Ingeniería", "procesos", ["estadistica1"]],
  [5, "Taller de Programación Web", "web", ["bd"]],
  [5, "Sistemas Operativos", "so", ["arqui"]],
  [5, "Algoritmos y Estructuras de Datos", "estructuras", ["poo"]],

  [6, "Gestión del Conocimiento", "gconocimiento", ["bd"]],
  [6, "Investigación Operativa", "io", ["estadistica2"]],
  [6, "Redes y Comunicación de Datos II", "redes2", ["redes1"]],
  [6, "Análisis y Diseño de Sistemas de Información", "analisis", ["estructuras", "admi"]],
  [6, "Desarrollo Web Integrado", "web2", ["web"]],
  [6, "Curso Integrador I: Sistemas - Software", "integ1", ["estructuras"]],

  [7, "Sistemas Distribuidos", "distribuidos", ["so"]],
  [7, "Gestión de la Cadena de Valor", "gestion", ["gconocimiento", "admi"]],
  [7, "Innovación y Transformación Digital", "td", ["analisis"]],
  [7, "Diseño y Arquitectura de Software", "soft", ["analisis"]],
  [7, "Seguridad Informática", "seguridad", ["redes1"]],

  [8, "Herramientas para la comunicación Efectiva", "efectiva", ["integ1"]],
  [8, "Calidad de Software", "riesgos", ["soft", "seguridad"]],
  [8, "Gestión de Riesgos Informáticos", "riesgos", ["analisis", "gestion"]],
  [8, "Planeamiento Estratégico de las TICs", "planeamiento", ["gestion"]],
  [8, "Diseño e Implementación de Arquitectura Empresarial", "empresa", ["soft"]],
  [8, "Inteligencia de Negocios", "bi", ["td", "web2"]],

  [9, "Formación para la Empleabilidad", "formacion", ["efectiva"]],
  [9, "Curso Integrador II: Sistemas", "integ2", ["empresa", "integ1"]],
  [9, "Formación para la Investigación - Sistemas", "invest", ["integ1", "redaccion2", "investigacion"]],
  [9, "Arquitectura orientada al servicio", "soa", ["empresa"]],
  [9, "Calidad de Servicio de TI", "calidad", ["analisis"]],
  [9, "Gestión de la Continuidad del Negocio", "negocio", ["riesgos"]],
  
  [10, "Ética Profesional", "profesional", ["herramientas", "procesos"]],
  [10, "Taller de Investigación - Sistemas", "tis", ["invest"]],
  [10, "Gobierno de TIC", "gobierno", ["planeamiento"]],
  [10, "Gestión de Proyectos", "proyectos", ["herramientas"]],
  [10, "Gestión de Data Center", "datacenter", ["calidad"]],
  [10, "Auditoría de Sistemas Informáticos", "auditoria", ["seguridad", "integ2"]],
];

// Agrupar por ciclo
const porCiclo = {};
cursos.forEach(([ciclo, nombre, id, prereqs]) => {
  if (!porCiclo[ciclo]) porCiclo[ciclo] = [];
  porCiclo[ciclo].push({ nombre, id, prereqs });
});

const estadoGuardado = JSON.parse(localStorage.getItem("estadoCursos") || "{}");
const container = document.getElementById("malla");

function actualizarEstado() {
  localStorage.setItem("estadoCursos", JSON.stringify(estadoGuardado));
  renderMalla();
}

// Mapa de dependencias inversas
const dependencias = {};

cursos.forEach(([_, __, id, prereqs]) => {
  prereqs.forEach(pr => {
    if (!dependencias[pr]) dependencias[pr] = [];
    dependencias[pr].push(id);
  });
});

function renderMalla() {
  container.innerHTML = "";
  for (let ciclo = 1; ciclo <= 10; ciclo++) {
    const columna = document.createElement("div");
    columna.className = "columna-ciclo";

    const titulo = document.createElement("h3");
    titulo.textContent = `${ciclo}° Ciclo`;
    columna.appendChild(titulo);

    (porCiclo[ciclo] || []).forEach(({ nombre, id, prereqs }) => {
      const div = document.createElement("div");
      div.className = "curso";
      div.textContent = nombre;
      div.dataset.id = id;

      const completado = estadoGuardado[id] === true;
      const completados = prereqs.filter(p => estadoGuardado[p]).length;
      const total = prereqs.length;
      const bloqueado = total > 0 && completados < total;

      if (completado) {
        div.classList.add("aprobado");
      } else if (bloqueado) {
        div.classList.add("bloqueado");

        // Mostrar progreso parcial
        const progreso = completados / total;
        if (progreso >= 0.66) div.classList.add("progreso-66");
        else if (progreso >= 0.5) div.classList.add("progreso-50");
        else if (progreso >= 0.33) div.classList.add("progreso-33");
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado")) return;

        if (estadoGuardado[id]) {
          desmarcarConDependientes(id);
        } else {
          estadoGuardado[id] = true;
        }

        actualizarEstado();
      });

      columna.appendChild(div);
    });

    container.appendChild(columna);
  }
}

function desmarcarConDependientes(id) {
  if (!estadoGuardado[id]) return; // Ya está desmarcado
  delete estadoGuardado[id];

  const hijos = dependencias[id] || [];
  hijos.forEach(hijo => {
    const prereqsHijo = cursos.find(c => c[2] === hijo)[3]; // lista de prereqs
    const prereqCumplidos = prereqsHijo.every(pr => estadoGuardado[pr]);

    if (!prereqCumplidos) {
      desmarcarConDependientes(hijo);
    }
  });
}


renderMalla();
