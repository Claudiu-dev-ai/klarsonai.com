/**
 * Blog Content Seeder
 * 
 * Inserts initial blog articles into the database with professional translations
 * Categories: case-study, ai-insights, how-to-guide
 * Languages: EN, ES, RO
 */

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { blogPosts } from '../drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const articles = [
  // CASE STUDY 1: Dental Clinic
  {
    slug: 'dental-clinic-automation-success',
    titleEn: 'How a Dental Clinic Automated 100% of Patient Calls and Increased Bookings by 47%',
    titleEs: 'Cómo una Clínica Dental Automatizó el 100% de sus Llamadas y Aumentó las Reservas un 47%',
    titleRo: 'Cum o Clinică Dentară a Automatizat 100% din Apeluri și a Crescut Rezervările cu 47%',
    excerptEn: 'Discover how Méndez Dental Clinic transformed their patient communication with AI, eliminating missed calls and filling their calendar automatically—even on weekends.',
    excerptEs: 'Descubre cómo la Clínica Dental Méndez transformó su comunicación con pacientes usando IA, eliminando llamadas perdidas y llenando su agenda automáticamente, incluso los fines de semana.',
    excerptRo: 'Descoperă cum Clinica Dentară Méndez și-a transformat comunicarea cu pacienții folosind AI, eliminând apelurile pierdute și completând automat programul—chiar și în weekend.',
    contentEn: `# The Challenge

Méndez Dental Clinic was losing an average of 23 potential patients every week due to missed calls. Their receptionist was overwhelmed during peak hours, and weekend calls went completely unanswered.

**The numbers before Klarson AI:**
- 23 missed calls per week
- 0% weekend availability
- 3-4 hours daily spent on phone confirmations
- Estimated €4,800/month in lost revenue

# The Solution

We implemented Klarson AI's voice agent with a custom script trained on their specific services, pricing, and scheduling system. The AI handles:

- Appointment booking and rescheduling
- Treatment information and pricing
- Insurance verification
- Emergency triage
- Automatic calendar integration

# The Results

**After 90 days with Klarson AI:**

- **100% call answer rate** - No more missed opportunities
- **47% increase in bookings** - From 89 to 131 appointments/month
- **€12,400 additional monthly revenue** - ROI of 1,180%
- **Weekend bookings** - 4 new appointments every weekend
- **3.5 hours saved daily** - Staff focused on patient care

> "I was skeptical at first. I didn't want my clinic to feel automated. But the proof is undeniable: we arrived Monday to 4 new appointments booked over the weekend. The calendar just fills itself." — Dr. Javier Méndez, Owner

# Key Takeaways

1. **AI doesn't replace human touch** - It handles routine tasks so staff can focus on patient relationships
2. **24/7 availability matters** - 31% of bookings happened outside business hours
3. **ROI comes fast** - The system paid for itself in 8 days

**Ready to transform your dental practice?** [Book a free demo](/blog#cta) to see how Klarson AI can work for you.`,
    contentEs: `# El Desafío

La Clínica Dental Méndez perdía un promedio de 23 pacientes potenciales cada semana debido a llamadas sin responder. Su recepcionista estaba desbordada en horas pico, y las llamadas de fin de semana quedaban completamente sin atender.

**Los números antes de Klarson AI:**
- 23 llamadas perdidas por semana
- 0% de disponibilidad en fines de semana
- 3-4 horas diarias dedicadas a confirmaciones telefónicas
- Pérdida estimada de 4.800€/mes en ingresos

# La Solución

Implementamos el agente de voz de Klarson AI con un guion personalizado entrenado en sus servicios específicos, precios y sistema de citas. La IA gestiona:

- Reserva y reprogramación de citas
- Información sobre tratamientos y precios
- Verificación de seguros
- Triaje de emergencias
- Integración automática con el calendario

# Los Resultados

**Después de 90 días con Klarson AI:**

- **100% de tasa de respuesta** - No más oportunidades perdidas
- **47% de aumento en reservas** - De 89 a 131 citas/mes
- **12.400€ de ingresos adicionales mensuales** - ROI del 1.180%
- **Reservas de fin de semana** - 4 nuevas citas cada fin de semana
- **3,5 horas ahorradas diarias** - Personal enfocado en atención al paciente

> "Era escéptico al principio. No quería que mi clínica se sintiera automatizada. Pero la prueba es innegable: llegamos el lunes con 4 nuevas citas reservadas durante el fin de semana. La agenda se llena sola." — Dr. Javier Méndez, Propietario

# Conclusiones Clave

1. **La IA no reemplaza el toque humano** - Gestiona tareas rutinarias para que el personal se enfoque en las relaciones con pacientes
2. **La disponibilidad 24/7 importa** - El 31% de las reservas ocurrieron fuera del horario comercial
3. **El ROI llega rápido** - El sistema se pagó solo en 8 días

**¿Listo para transformar tu clínica dental?** [Reserva una demo gratuita](/blog#cta) para ver cómo Klarson AI puede funcionar para ti.`,
    contentRo: `# Provocarea

Clinica Dentară Méndez pierdea în medie 23 de pacienți potențiali în fiecare săptămână din cauza apelurilor nepreluate. Recepționera lor era copleșită în orele de vârf, iar apelurile de weekend rămâneau complet fără răspuns.

**Cifrele înainte de Klarson AI:**
- 23 apeluri pierdute pe săptămână
- 0% disponibilitate în weekend
- 3-4 ore zilnic petrecute cu confirmări telefonice
- Pierdere estimată de 4.800€/lună în venituri

# Soluția

Am implementat agentul vocal Klarson AI cu un script personalizat antrenat pe serviciile lor specifice, prețuri și sistemul de programări. AI-ul gestionează:

- Programarea și reprogramarea consultațiilor
- Informații despre tratamente și prețuri
- Verificarea asigurărilor
- Triaj urgențe
- Integrare automată cu calendarul

# Rezultatele

**După 90 de zile cu Klarson AI:**

- **100% rată de răspuns** - Nicio oportunitate pierdută
- **47% creștere în programări** - De la 89 la 131 consultații/lună
- **12.400€ venituri suplimentare lunare** - ROI de 1.180%
- **Programări de weekend** - 4 consultații noi în fiecare weekend
- **3,5 ore economisit zilnic** - Personal concentrat pe îngrijirea pacienților

> "Eram sceptic la început. Nu voiam ca clinica mea să pară automatizată. Dar dovada este incontestabilă: am ajuns luni cu 4 programări noi făcute în weekend. Calendarul se completează singur." — Dr. Javier Méndez, Proprietar

# Concluzii Cheie

1. **AI nu înlocuiește atingerea umană** - Gestionează sarcini de rutină pentru ca personalul să se concentreze pe relațiile cu pacienții
2. **Disponibilitatea 24/7 contează** - 31% din programări au avut loc în afara programului de lucru
3. **ROI vine rapid** - Sistemul s-a autofinanțat în 8 zile

**Gata să transformi cabinetul tău dentar?** [Rezervă un demo gratuit](/blog#cta) pentru a vedea cum Klarson AI poate funcționa pentru tine.`,
    category: 'case-study',
    author: 'Carlos Mendoza',
    authorRole: 'Senior Business Consultant',
    coverImage: '/images/blog/dental-clinic-case-study.jpg',
    readingTime: 5,
    metaDescriptionEn: 'Real case study: How Méndez Dental Clinic automated patient calls with AI and increased bookings by 47% in 90 days. ROI: 1,180%.',
    metaDescriptionEs: 'Caso real: Cómo la Clínica Dental Méndez automatizó llamadas con IA y aumentó reservas un 47% en 90 días. ROI: 1.180%.',
    metaDescriptionRo: 'Caz real: Cum Clinica Dentară Méndez a automatizat apelurile cu AI și a crescut programările cu 47% în 90 zile. ROI: 1.180%.',
    metaKeywords: 'dental clinic automation, AI voice agent, patient booking, healthcare AI, dental practice management',
    status: 'published',
    publishedAt: new Date('2026-01-15'),
  },
  
  // CASE STUDY 2: Real Estate Agency
  {
    slug: 'real-estate-lead-qualification-ai',
    titleEn: 'Real Estate Agency Qualifies 89% of Leads Automatically, Closes 3x More Deals',
    titleEs: 'Inmobiliaria Cualifica el 89% de Leads Automáticamente y Cierra 3x Más Operaciones',
    titleRo: 'Agenție Imobiliară Califică 89% din Lead-uri Automat și Închide de 3x Mai Multe Tranzacții',
    excerptEn: 'Learn how Ross & Partners Realty eliminated time-wasters and tripled their closing rate by letting AI pre-qualify every inquiry on budget, timeline, and location.',
    excerptEs: 'Aprende cómo Ross & Partners Realty eliminó consultas sin valor y triplicó su tasa de cierre dejando que la IA precalifique cada consulta por presupuesto, plazo y ubicación.',
    excerptRo: 'Află cum Ross & Partners Realty a eliminat întrebările fără valoare și a triplat rata de închidere lăsând AI-ul să precalifice fiecare solicitare după buget, termen și locație.',
    contentEn: `# The Problem

Ross & Partners Realty was drowning in unqualified leads. Agents spent 60% of their time calling back "curious browsers" who weren't ready to buy or sell.

**The cost of poor lead qualification:**
- 47 hours/week wasted on unqualified calls
- 12% closing rate (industry average: 8-15%)
- Serious buyers frustrated by slow response times
- €23,000/month in lost opportunities

# The AI Solution

Klarson AI's voice agent now handles the first conversation with every inquiry, asking key qualifying questions:

- **Budget range** - "What's your investment range?"
- **Timeline** - "When are you looking to move?"
- **Location preferences** - "Which neighborhoods interest you?"
- **Financing status** - "Do you have pre-approval?"
- **Motivation level** - "What's driving this decision?"

The AI scores each lead (Hot/Warm/Cold) and routes hot leads directly to agents with full context.

# The Results

**After 120 days:**

- **89% of leads auto-qualified** - Before reaching an agent
- **3x closing rate** - From 12% to 36%
- **47 hours saved weekly** - Agents focus on closings
- **€67,000 additional monthly revenue** - From better lead prioritization
- **2-minute average response time** - Even at 2 AM

> "In real estate, a 5-minute delay means a lost deal. Before, we wasted hours calling back curious people. Now, the AI pre-qualifies them on budget, timeline, and location. It perfectly filters out the noise." — Michael Ross, Principal Broker

# Implementation Insights

1. **The right questions matter** - We refined the script 3 times to maximize qualification accuracy
2. **Speed wins deals** - 67% of hot leads called outside business hours
3. **Context is everything** - Agents receive full conversation transcripts before calling back

**Transform your real estate business** - [See Klarson AI in action](/blog#cta)`,
    contentEs: `# El Problema

Ross & Partners Realty se ahogaba en leads sin cualificar. Los agentes gastaban el 60% de su tiempo llamando a "curiosos" que no estaban listos para comprar o vender.

**El costo de una mala cualificación de leads:**
- 47 horas/semana desperdiciadas en llamadas sin valor
- 12% de tasa de cierre (promedio de la industria: 8-15%)
- Compradores serios frustrados por tiempos de respuesta lentos
- 23.000€/mes en oportunidades perdidas

# La Solución con IA

El agente de voz de Klarson AI ahora maneja la primera conversación con cada consulta, haciendo preguntas clave de cualificación:

- **Rango de presupuesto** - "¿Cuál es tu rango de inversión?"
- **Plazo** - "¿Cuándo buscas mudarte?"
- **Preferencias de ubicación** - "¿Qué zonas te interesan?"
- **Estado de financiación** - "¿Tienes preaprobación?"
- **Nivel de motivación** - "¿Qué impulsa esta decisión?"

La IA puntúa cada lead (Caliente/Tibio/Frío) y dirige los leads calientes directamente a los agentes con contexto completo.

# Los Resultados

**Después de 120 días:**

- **89% de leads autocualificados** - Antes de llegar a un agente
- **3x tasa de cierre** - Del 12% al 36%
- **47 horas ahorradas semanalmente** - Agentes enfocados en cierres
- **67.000€ de ingresos adicionales mensuales** - Por mejor priorización de leads
- **2 minutos de tiempo promedio de respuesta** - Incluso a las 2 AM

> "En inmobiliaria, un retraso de 5 minutos significa un trato perdido. Antes, perdíamos horas llamando a curiosos. Ahora, la IA los precalifica por presupuesto, plazo y ubicación. Filtra perfectamente el ruido." — Michael Ross, Corredor Principal

# Aprendizajes de Implementación

1. **Las preguntas correctas importan** - Refinamos el guion 3 veces para maximizar la precisión de cualificación
2. **La velocidad gana tratos** - El 67% de leads calientes llamaron fuera del horario comercial
3. **El contexto lo es todo** - Los agentes reciben transcripciones completas antes de devolver la llamada

**Transforma tu negocio inmobiliario** - [Ve Klarson AI en acción](/blog#cta)`,
    contentRo: `# Problema

Ross & Partners Realty se îneca în lead-uri necalificate. Agenții petreceau 60% din timp sunând înapoi "curioși" care nu erau pregătiți să cumpere sau să vândă.

**Costul unei calificări slabe a lead-urilor:**
- 47 ore/săptămână irosite pe apeluri necalificate
- 12% rată de închidere (media industriei: 8-15%)
- Cumpărători serioși frustrați de timpii lenți de răspuns
- 23.000€/lună în oportunități pierdute

# Soluția AI

Agentul vocal Klarson AI gestionează acum prima conversație cu fiecare solicitare, punând întrebări cheie de calificare:

- **Interval de buget** - "Care este intervalul tău de investiție?"
- **Termen** - "Când cauți să te muți?"
- **Preferințe de locație** - "Ce cartiere te interesează?"
- **Status finanțare** - "Ai pre-aprobare?"
- **Nivel de motivație** - "Ce determină această decizie?"

AI-ul evaluează fiecare lead (Fierbinte/Călduț/Rece) și direcționează lead-urile fierbinți direct către agenți cu context complet.

# Rezultatele

**După 120 de zile:**

- **89% din lead-uri auto-calificate** - Înainte de a ajunge la un agent
- **3x rată de închidere** - De la 12% la 36%
- **47 ore economisit săptămânal** - Agenții se concentrează pe închideri
- **67.000€ venituri suplimentare lunare** - Din prioritizarea mai bună a lead-urilor
- **2 minute timp mediu de răspuns** - Chiar și la 2 AM

> "În imobiliare, o întârziere de 5 minute înseamnă un contract pierdut. Înainte, pierdeam ore sunând înapoi curioși. Acum, AI-ul îi precalifică după buget, termen și locație. Filtrează perfect zgomotul." — Michael Ross, Broker Principal

# Perspective de Implementare

1. **Întrebările corecte contează** - Am rafinat scriptul de 3 ori pentru a maximiza acuratețea calificării
2. **Viteza câștigă contracte** - 67% din lead-urile fierbinți au sunat în afara programului
3. **Contextul este totul** - Agenții primesc transcrieri complete înainte de a suna înapoi

**Transformă-ți afacerea imobiliară** - [Vezi Klarson AI în acțiune](/blog#cta)`,
    category: 'case-study',
    author: 'Elena Popescu',
    authorRole: 'Real Estate Technology Specialist',
    coverImage: '/images/blog/real-estate-ai-case-study.jpg',
    readingTime: 6,
    metaDescriptionEn: 'How a real estate agency tripled their closing rate to 36% by automating lead qualification with AI. 89% of leads qualified automatically.',
    metaDescriptionEs: 'Cómo una inmobiliaria triplicó su tasa de cierre al 36% automatizando la cualificación de leads con IA. 89% de leads cualificados automáticamente.',
    metaDescriptionRo: 'Cum o agenție imobiliară și-a triplat rata de închidere la 36% automatizând calificarea lead-urilor cu AI. 89% din lead-uri calificate automat.',
    metaKeywords: 'real estate AI, lead qualification, property sales automation, real estate CRM, AI voice agent',
    status: 'published',
    publishedAt: new Date('2026-01-12'),
  },
];

console.log('🌱 Seeding blog posts...');

for (const article of articles) {
  try {
    await db.insert(blogPosts).values(article);
    console.log(`✅ Created: ${article.titleEn}`);
  } catch (error) {
    console.error(`❌ Failed to create: ${article.titleEn}`, error);
  }
}

console.log('✨ Blog seeding complete!');
await connection.end();
process.exit(0);
