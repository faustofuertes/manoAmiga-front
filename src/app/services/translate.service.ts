import { Injectable } from '@angular/core';

export type Lang = 'es' | 'en' | 'pt';

interface LangOption {
  code: Lang;
  label: string;
  flag: string;
}

const STORAGE_KEY = 'lang';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  readonly languages: LangOption[] = [
    { code: 'es', label: 'Español', flag: '🇦🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' }
  ];

  private _current: Lang = 'es';
  private _dict: Record<string, Record<Lang, string>> = {};

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && this.languages.some(l => l.code === stored)) {
      this._current = stored;
    }
    this.loadDictionary();
  }

  get current(): Lang {
    return this._current;
  }

  get currentOption(): LangOption {
    return this.languages.find(l => l.code === this._current)!;
  }

  setLang(lang: Lang): void {
    if (this._current === lang) return;
    this._current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }

  t(key: string): string {
    const entry = this._dict[key];
    if (!entry) return key;
    return entry[this._current] ?? entry['es'] ?? key;
  }

  private loadDictionary(): void {
    this._dict = {
      // ─── Header ───
      'header.login': {
        es: 'Ingresar',
        en: 'Log in',
        pt: 'Entrar'
      },
      'header.logout': {
        es: 'Cerrar sesión',
        en: 'Log out',
        pt: 'Sair'
      },
      'header.myProfile': {
        es: 'Mi perfil',
        en: 'My profile',
        pt: 'Meu perfil'
      },
      'header.loginSession': {
        es: 'Iniciar sesión',
        en: 'Log in',
        pt: 'Entrar'
      },
      'header.darkMode': {
        es: 'Modo oscuro',
        en: 'Dark mode',
        pt: 'Modo escuro'
      },
      'header.lightMode': {
        es: 'Modo claro',
        en: 'Light mode',
        pt: 'Modo claro'
      },
      'header.language': {
        es: 'Idioma',
        en: 'Language',
        pt: 'Idioma'
      },

      // ─── Home ───
      'home.title': {
        es: 'Encontrá profesionales cerca tuyo.',
        en: 'Find professionals near you.',
        pt: 'Encontre profissionais perto de você.'
      },
      'home.subtitle': {
        es: 'Plomeros, electricistas, jardineros y más en Mar del Plata — todo en un solo lugar.',
        en: 'Plumbers, electricians, gardeners and more in Mar del Plata — all in one place.',
        pt: 'Encanadores, eletricistas, jardineiros e mais em Mar del Plata — tudo em um só lugar.'
      },
      'home.cta': {
        es: '¡Publicá tu servicio ahora!',
        en: 'Post your service now!',
        pt: 'Publique seu serviço agora!'
      },

      // ─── Categorías / jobs ───
      'job.plomero': { es: 'Plomeros', en: 'Plumbers', pt: 'Encanadores' },
      'job.electricista': { es: 'Electricistas', en: 'Electricians', pt: 'Eletricistas' },
      'job.jardinero': { es: 'Jardineros', en: 'Gardeners', pt: 'Jardineiros' },
      'job.pintor': { es: 'Pintores', en: 'Painters', pt: 'Pintores' },
      'job.cerrajero': { es: 'Cerrajeros', en: 'Locksmiths', pt: 'Chaveiros' },
      'job.carpintero': { es: 'Carpinteros', en: 'Carpenters', pt: 'Carpinteiros' },
      'job.limpieza': { es: 'Limpieza', en: 'Cleaning', pt: 'Limpeza' },
      'job.tecnico': { es: 'Técnicos', en: 'Technicians', pt: 'Técnicos' },

      'categories.professionalsAvailable': {
        es: 'profesionales disponibles',
        en: 'professionals available',
        pt: 'profissionais disponíveis'
      },
      'categories.inMdp': {
        es: 'en Mar del Plata',
        en: 'in Mar del Plata',
        pt: 'em Mar del Plata'
      },
      'categories.searchPlaceholder': {
        es: 'Buscar por nombre...',
        en: 'Search by name...',
        pt: 'Buscar por nome...'
      },
      'categories.newest': {
        es: 'Más nuevos',
        en: 'Newest',
        pt: 'Mais novos'
      },

      // ─── Categories no-results ───
      'categories.noResults.title': {
        es: 'No encontramos profesionales para este oficio… todavía.',
        en: 'We couldn\'t find professionals for this trade… yet.',
        pt: 'Não encontramos profissionais para este ofício… ainda.'
      },
      'categories.noResults.growing': {
        es: 'Mano Amiga está creciendo y pronto vas a encontrar personas disponibles en tu zona.',
        en: 'Mano Amiga is growing and you\'ll soon find people available in your area.',
        pt: 'Mano Amiga está crescendo e em breve você encontrará pessoas disponíveis na sua região.'
      },
      'categories.noResults.offer': {
        es: '¿Ofrecés este servicio?',
        en: 'Do you offer this service?',
        pt: 'Você oferece este serviço?'
      },
      'categories.noResults.register': {
        es: 'Registrate y empezá a conseguir clientes.',
        en: 'Sign up and start getting clients.',
        pt: 'Cadastre-se e comece a conseguir clientes.'
      },
      'categories.noResults.share': {
        es: '¿Conocés a alguien que lo haga? Compartile Mano Amiga y ayudalo a hacerse conocer.',
        en: 'Know someone who does? Share Mano Amiga and help them get noticed.',
        pt: 'Conhece alguém que faz? Compartilhe Mano Amiga e ajude-o a se destacar.'
      },
      'categories.noResults.cta': {
        es: 'Quiero registrarme como profesional',
        en: 'I want to register as a professional',
        pt: 'Quero me cadastrar como profissional'
      },

      // ─── Profile ───
      'profile.whatsapp': { es: 'WhatsApp', en: 'WhatsApp', pt: 'WhatsApp' },
      'profile.callMe': { es: 'Llamame', en: 'Call me', pt: 'Me ligue' },
      'profile.schedule': {
        es: 'Horarios de trabajo',
        en: 'Work schedule',
        pt: 'Horário de trabalho'
      },
      'profile.visitPrice': {
        es: 'Precio visita.',
        en: 'Visit price.',
        pt: 'Preço da visita.'
      },
      'profile.opinions': {
        es: 'opiniones',
        en: 'reviews',
        pt: 'avaliações'
      },
      'profile.yearsExp': {
        es: 'Años de experiencia.',
        en: 'Years of experience.',
        pt: 'Anos de experiência.'
      },

      // ─── Footer ───
      'footer.description': {
        es: 'Conectando personas con profesionales de confianza para tareas del hogar.',
        en: 'Connecting people with trusted professionals for household tasks.',
        pt: 'Conectando pessoas com profissionais de confiança para tarefas domésticas.'
      },
      'footer.terms': {
        es: 'Términos y Condiciones',
        en: 'Terms & Conditions',
        pt: 'Termos e Condições'
      },
      'footer.privacy': {
        es: 'Políticas de Privacidad',
        en: 'Privacy Policy',
        pt: 'Política de Privacidade'
      },

      // ─── FAQ ───
      'faq.title': {
        es: 'Preguntas frecuentes.',
        en: 'Frequently asked questions.',
        pt: 'Perguntas frequentes.'
      },
      'faq.q0': {
        es: '¿Qué es Mano Amiga y para qué sirve?',
        en: 'What is Mano Amiga and what is it for?',
        pt: 'O que é Mano Amiga e para que serve?'
      },
      'faq.a0': {
        es: 'Mano Amiga es una plataforma que conecta personas que necesitan ayuda con tareas del hogar con profesionales independientes disponibles en su ciudad.',
        en: 'Mano Amiga is a platform that connects people who need help with household tasks with independent professionals available in their city.',
        pt: 'Mano Amiga é uma plataforma que conecta pessoas que precisam de ajuda com tarefas domésticas a profissionais independentes disponíveis na sua cidade.'
      },
      'faq.q1': {
        es: '¿Cómo contacto a un trabajador?',
        en: 'How do I contact a worker?',
        pt: 'Como entro em contato com um trabalhador?'
      },
      'faq.a1': {
        es: 'Buscás el oficio que necesitás, elegís una publicación y hacés clic en el botón para llamarlo o escribirle directamente.',
        en: 'Search for the trade you need, choose a listing, and click the button to call or message them directly.',
        pt: 'Procure o ofício que precisa, escolha um anúncio e clique no botão para ligar ou escrever diretamente.'
      },
      'faq.q2': {
        es: '¿La app es gratuita?',
        en: 'Is the app free?',
        pt: 'O app é gratuito?'
      },
      'faq.a2': {
        es: 'Sí, es completamente gratuita tanto para quienes buscan un servicio como para los trabajadores que publican sus avisos.',
        en: 'Yes, it\'s completely free for both service seekers and workers who post their ads.',
        pt: 'Sim, é completamente gratuito tanto para quem busca um serviço quanto para os trabalhadores que publicam seus anúncios.'
      },
      'faq.q3': {
        es: '¿Cómo sé si un profesional es confiable?',
        en: 'How do I know if a professional is reliable?',
        pt: 'Como sei se um profissional é confiável?'
      },
      'faq.a3': {
        es: 'Cada publicación incluye una descripción del servicio, experiencia del trabajador y reseñas reales de otros usuarios que lo hayan contratado.',
        en: 'Each listing includes a service description, worker experience, and real reviews from other users who hired them.',
        pt: 'Cada anúncio inclui uma descrição do serviço, experiência do trabalhador e avaliações reais de outros usuários que o contrataram.'
      },
      'faq.q4': {
        es: '¿Mano Amiga participa en los trabajos o contrataciones?',
        en: 'Does Mano Amiga participate in jobs or hiring?',
        pt: 'Mano Amiga participa nos trabalhos ou contratações?'
      },
      'faq.a4': {
        es: 'No. Mano Amiga solo ofrece el espacio para que los profesionales publiquen sus servicios y los usuarios los contacten directamente. No intervenimos en la contratación ni en la ejecución del trabajo.',
        en: 'No. Mano Amiga only provides the space for professionals to post their services and for users to contact them directly. We don\'t intervene in hiring or work execution.',
        pt: 'Não. Mano Amiga apenas oferece o espaço para que os profissionais publiquem seus serviços e os usuários os contatem diretamente. Não intervimos na contratação nem na execução do trabalho.'
      },

      // ─── Profesionales destacados ───
      'featured.opinions': {
        es: 'opiniones',
        en: 'reviews',
        pt: 'avaliações'
      },
      'featured.desc.electricista': {
        es: 'Electricista matriculado. Electricidad domiciliaria y comercial. Realizamos instalaciones nuevas, modificaciones y reparaciones. Urgencias las 24 horas.',
        en: 'Licensed electrician. Residential and commercial electrical work. New installations, modifications and repairs. 24-hour emergency service.',
        pt: 'Eletricista credenciado. Eletricidade residencial e comercial. Realizamos instalações novas, modificações e reparos. Urgências 24 horas.'
      },
      'featured.desc.plomero': {
        es: 'Plomería en general. 10 años en el gremio. Reparación de artefactos a gas: cocinas, calefactores, calefones y termotanques, etc. Urgencias las 24 horas.',
        en: 'General plumbing. 10 years in the trade. Gas appliance repair: stoves, heaters, water heaters and tanks, etc. 24-hour emergency service.',
        pt: 'Encanamento em geral. 10 anos no ramo. Reparo de aparelhos a gás: fogões, aquecedores, boilers e reservatórios, etc. Urgências 24 horas.'
      },
      'featured.desc.tecnico': {
        es: 'Tecnico en refrigeración especializado en aire acondicionado instalación reparacion y mantenimiento, visita sin cargo en toda la ciudad.',
        en: 'Refrigeration technician specialized in air conditioning installation, repair and maintenance. Free visit across the city.',
        pt: 'Técnico em refrigeração especializado em ar condicionado, instalação, reparo e manutenção. Visita gratuita em toda a cidade.'
      },
      'featured.desc.pintor': {
        es: 'Pintor de interiores y exteriores. Texturados, alisados, trabajos de diseño, laqueados, barnizados y pintura en general. Su consulta no molesta.',
        en: 'Interior and exterior painter. Textures, smoothing, design work, lacquering, varnishing and general painting. Feel free to ask.',
        pt: 'Pintor de interiores e exteriores. Texturizados, alisados, trabalhos de design, laqueados, envernizados e pintura em geral. Sua consulta não incomoda.'
      },

      // ─── Testimonios / Reseñas generales ───
      'review.t0': {
        es: '"Busqué un plomero por la app, elegí uno que tenía buenas opiniones y lo contacté directo. Me respondió al toque. En menos de dos horas ya tenía todo resuelto."',
        en: '"I looked for a plumber on the app, chose one with good reviews and contacted him directly. He replied right away. In less than two hours everything was resolved."',
        pt: '"Procurei um encanador pelo app, escolhi um com boas avaliações e o contatei diretamente. Me respondeu na hora. Em menos de duas horas tudo estava resolvido."'
      },
      'review.t1': {
        es: '"Me encantó la idea de Mano Amiga. No es como otras apps que te cobran o se meten en el medio. Acá los trabajadores se publican y vos los llamás directo. Conseguí una chica para limpieza y fue lo más."',
        en: '"I loved the idea of Mano Amiga. It\'s not like other apps that charge you or get in the way. Here workers post their services and you call them directly. I found a cleaning lady and it was great."',
        pt: '"Adorei a ideia do Mano Amiga. Não é como outros apps que cobram ou se metem no meio. Aqui os trabalhadores publicam e você liga direto. Consegui uma moça para limpeza e foi ótimo."'
      },
      'review.t2': {
        es: '"Una vuelta necesitaba un electricista urgente, entré a Mano Amiga y encontré varios cerca de casa. Elegí uno, le mandé mensaje y vino esa misma tarde. Muy piola."',
        en: '"Once I needed an electrician urgently, I went to Mano Amiga and found several near my home. I chose one, sent a message and he came that same afternoon. Really cool."',
        pt: '"Uma vez precisei de um eletricista urgente, entrei no Mano Amiga e encontrei vários perto de casa. Escolhi um, mandei mensagem e ele veio naquela mesma tarde. Muito bom."'
      },
      'review.t3': {
        es: '"Lo bueno es que no necesitás registrarte ni nada raro. Entrás, buscás el rubro que querés y listo. Llamás o escribís al que te guste. Así encontré un técnico que me salvó con el lavarropas."',
        en: '"The good thing is you don\'t need to register or anything weird. You go in, search for the trade you want and that\'s it. You call or message whoever you like. That\'s how I found a technician who saved my washing machine."',
        pt: '"O bom é que não precisa se cadastrar nem nada estranho. Você entra, procura o rubro que quer e pronto. Liga ou escreve para quem quiser. Assim encontrei um técnico que salvou minha máquina de lavar."'
      },
      'review.t4': {
        es: '"Busqué un jardinero para arreglar el patio. Me gustó que cada trabajador tiene su aviso y se nota que lo arman ellos mismos. Hablé con uno por WhatsApp y coordinamos sin drama."',
        en: '"I looked for a gardener to fix the yard. I liked that each worker has their own listing and you can tell they set it up themselves. I talked to one on WhatsApp and we arranged everything easily."',
        pt: '"Procurei um jardineiro para arrumar o quintal. Gostei que cada trabalhador tem seu anúncio e dá pra notar que eles mesmos montam. Falei com um pelo WhatsApp e combinamos tudo sem problema."'
      },

      // ─── Reviews (personal-reviews) ───
      'reviews.makeReview': {
        es: 'Hacer reseña',
        en: 'Write a review',
        pt: 'Escrever avaliação'
      },
      'reviews.howWasService': {
        es: '¿Cómo fue el servicio de',
        en: 'How was the service of',
        pt: 'Como foi o serviço de'
      },
      'reviews.minChars': {
        es: 'Mínimo 20 caracteres',
        en: 'Minimum 20 characters',
        pt: 'Mínimo 20 caracteres'
      },
      'reviews.placeholder': {
        es: 'Contanos cómo fue tu experiencia con este profesional.',
        en: 'Tell us about your experience with this professional.',
        pt: 'Conte-nos como foi sua experiência com este profissional.'
      },
      'reviews.publish': {
        es: 'Publicar',
        en: 'Publish',
        pt: 'Publicar'
      },
      'reviews.tellExperience': {
        es: 'Contanos tu experiencia con',
        en: 'Tell us your experience with',
        pt: 'Conte-nos sua experiência com'
      },
      'reviews.loginPrompt': {
        es: 'Deja tu reseña registrándote o iniciando sesión.',
        en: 'Leave your review by signing up or logging in.',
        pt: 'Deixe sua avaliação cadastrando-se ou fazendo login.'
      },
      'reviews.register': {
        es: 'Registrate en Mano Amiga',
        en: 'Sign up on Mano Amiga',
        pt: 'Cadastre-se no Mano Amiga'
      },
      'reviews.login': {
        es: 'Iniciar sesión',
        en: 'Log in',
        pt: 'Fazer login'
      },

      // ─── Modal idioma ───
      'lang.title': {
        es: 'Elegí tu idioma',
        en: 'Choose your language',
        pt: 'Escolha seu idioma'
      },

      // ─── Panel de usuario (user-header) ───
      'panel.myAccount': { es: 'Mi cuenta', en: 'My account', pt: 'Minha conta' },
      'panel.myPosts': { es: 'Mis avisos', en: 'My listings', pt: 'Meus anúncios' },

      // ─── Profile card ───
      'profileCard.memberSince': { es: 'Miembro desde', en: 'Member since', pt: 'Membro desde' },
      'profileCard.active': { es: 'Cuenta activa', en: 'Active account', pt: 'Conta ativa' },
      'profileCard.inactive': { es: 'Cuenta inactiva', en: 'Inactive account', pt: 'Conta inativa' },

      // ─── My profile (danger zone) ───
      'danger.title': { es: 'Zona peligrosa', en: 'Danger zone', pt: 'Zona perigosa' },
      'danger.text': {
        es: 'Esta acción eliminará tu cuenta y todos tus datos de forma permanente.',
        en: 'This action will permanently delete your account and all your data.',
        pt: 'Esta ação excluirá sua conta e todos os seus dados permanentemente.'
      },
      'danger.delete': { es: 'Eliminar mi cuenta', en: 'Delete my account', pt: 'Excluir minha conta' },

      // ─── My posts ───
      'myPosts.title': { es: 'Mis publicaciones', en: 'My listings', pt: 'Meus anúncios' },
      'myPosts.new': { es: 'Nueva publicación', en: 'New listing', pt: 'Novo anúncio' },
      'myPosts.active': { es: 'Activo', en: 'Active', pt: 'Ativo' },
      'myPosts.inactive': { es: 'Inactivo', en: 'Inactive', pt: 'Inativo' },
      'myPosts.empty': {
        es: 'No tenés publicaciones todavía.',
        en: 'You don\'t have any listings yet.',
        pt: 'Você ainda não tem anúncios.'
      },

      // ─── Edit form ───
      'editForm.location': { es: 'Ubicación', en: 'Location', pt: 'Localização' },
      'editForm.selectCity': { es: 'Selecciona una ciudad', en: 'Select a city', pt: 'Selecione uma cidade' },
      'editForm.phone': { es: 'Número de contacto', en: 'Contact number', pt: 'Número de contato' },
      'editForm.schedule': { es: 'Horarios', en: 'Schedule', pt: 'Horários' },
      'editForm.pricing': { es: 'Tarifa de visita ($)', en: 'Visit fee ($)', pt: 'Taxa de visita ($)' },
      'editForm.experience': { es: 'Experiencia (años)', en: 'Experience (years)', pt: 'Experiência (anos)' },
      'editForm.description': { es: 'Descripción', en: 'Description', pt: 'Descrição' },
      'editForm.descPlaceholder': {
        es: 'Describí tu servicio en detalle...',
        en: 'Describe your service in detail...',
        pt: 'Descreva seu serviço em detalhes...'
      },
      'editForm.delete': { es: 'Eliminar', en: 'Delete', pt: 'Excluir' },
      'editForm.save': { es: 'Guardar cambios', en: 'Save changes', pt: 'Salvar alterações' },
      'editForm.saved': { es: 'Guardado', en: 'Saved', pt: 'Salvo' },
      'editForm.maxChars50': {
        es: 'La longitud máxima es de 50 caracteres',
        en: 'Maximum length is 50 characters',
        pt: 'O comprimento máximo é de 50 caracteres'
      },
      'editForm.maxValue': { es: 'El valor máximo es 99999', en: 'Maximum value is 99999', pt: 'O valor máximo é 99999' },
      'editForm.maxYears': { es: 'Máximo 99 años', en: 'Maximum 99 years', pt: 'Máximo 99 anos' },
      'editForm.emptyTitle': {
        es: 'Seleccioná una publicación',
        en: 'Select a listing',
        pt: 'Selecione um anúncio'
      },
      'editForm.emptyText': {
        es: 'Elegí una de tus publicaciones de la lista para editarla.',
        en: 'Choose one of your listings from the list to edit it.',
        pt: 'Escolha um dos seus anúncios da lista para editá-lo.'
      },

      // ─── Post form (crear publicación) ───
      'postForm.tip': { es: 'A saber', en: 'Good to know', pt: 'Bom saber' },
      'postForm.step1Tip': {
        es: 'En este paso, ingresá el trabajo que ofrecés y la ubicación donde se realizará. Actualmente, Mano Amiga © está disponible solo en Mar del Plata.',
        en: 'In this step, enter the job you offer and the location. Currently, Mano Amiga © is only available in Mar del Plata.',
        pt: 'Neste passo, insira o trabalho que você oferece e a localização. Atualmente, Mano Amiga © está disponível apenas em Mar del Plata.'
      },
      'postForm.whatService': { es: '¿Qué servicio ofrecés?', en: 'What service do you offer?', pt: 'Que serviço você oferece?' },
      'postForm.selectJob': { es: 'Selecciona un trabajo', en: 'Select a job', pt: 'Selecione um trabalho' },
      'postForm.where': { es: '¿En dónde?', en: 'Where?', pt: 'Onde?' },
      'postForm.selectCity': { es: 'Selecciona una ciudad', en: 'Select a city', pt: 'Selecione uma cidade' },
      'postForm.next': { es: 'Siguiente', en: 'Next', pt: 'Próximo' },
      'postForm.back': { es: 'Volver', en: 'Back', pt: 'Voltar' },
      'postForm.step2Tip': {
        es: 'La descripción es lo primero que verá quien visite tu perfil. Usala para destacar tus habilidades, experiencia y forma de trabajo. Ayuda a generar confianza y a que te elijan.',
        en: 'The description is the first thing visitors will see on your profile. Use it to highlight your skills, experience and work style. It helps build trust.',
        pt: 'A descrição é a primeira coisa que os visitantes verão no seu perfil. Use-a para destacar suas habilidades, experiência e forma de trabalho. Ajuda a gerar confiança.'
      },
      'postForm.descLabel': { es: 'Descripción de tu aviso', en: 'Listing description', pt: 'Descrição do seu anúncio' },
      'postForm.descPlaceholder': {
        es: 'Ej: Plomero con más de 10 años de experiencia en reparaciones, instalaciones y mantenimiento de cañerías, sanitarios y sistemas de agua potable. Puntual, responsable y con atención a los detalles.',
        en: 'E.g.: Plumber with over 10 years of experience in repairs, installations and maintenance of pipes, plumbing and water systems. Punctual, responsible and detail-oriented.',
        pt: 'Ex: Encanador com mais de 10 anos de experiência em reparos, instalações e manutenção de tubulações, sanitários e sistemas de água potável. Pontual, responsável e atento aos detalhes.'
      },
      'postForm.step3Tip': {
        es: 'Podés elegir tu tarifa de visita y modificarla cuando lo desees.',
        en: 'You can choose your visit fee and change it anytime.',
        pt: 'Você pode escolher sua taxa de visita e alterá-la quando quiser.'
      },
      'postForm.pricingLabel': { es: 'Tarifa de visita', en: 'Visit fee', pt: 'Taxa de visita' },
      'postForm.step4Tip': {
        es: 'Podés seleccionar tus horarios de trabajo y ajustarlos cuando lo necesites.',
        en: 'You can set your work schedule and adjust it whenever you need.',
        pt: 'Você pode definir seus horários de trabalho e ajustá-los quando precisar.'
      },
      'postForm.scheduleLabel': { es: 'Horarios de trabajo', en: 'Work schedule', pt: 'Horários de trabalho' },
      'postForm.schedulePlaceholder': { es: 'Ej: Lunes a Viernes 8:00 a 16:00', en: 'E.g.: Monday to Friday 8:00 to 16:00', pt: 'Ex: Segunda a Sexta 8:00 a 16:00' },
      'postForm.experienceLabel': { es: 'Años de experiencia', en: 'Years of experience', pt: 'Anos de experiência' },
      'postForm.step5Tip': {
        es: 'Ingresá tu número empezando con el código de Mar del Plata 223, seguido de tu número sin el 15 ni símbolos. Ejemplo: 2231234567.',
        en: 'Enter your number starting with the Mar del Plata area code 223, followed by your number without 15 or symbols. Example: 2231234567.',
        pt: 'Insira seu número começando com o código de Mar del Plata 223, seguido do seu número sem 15 ou símbolos. Exemplo: 2231234567.'
      },
      'postForm.phoneLabel': { es: 'Número de contacto', en: 'Contact number', pt: 'Número de contato' },
      'postForm.publish': { es: 'Publicar', en: 'Publish', pt: 'Publicar' },
      'postForm.publishing': { es: 'Publicando...', en: 'Publishing...', pt: 'Publicando...' },
      'postForm.minChars': { es: 'Mínimo 50 caracteres', en: 'Minimum 50 characters', pt: 'Mínimo 50 caracteres' },
      'postForm.charsLeft': { es: 'Faltan', en: 'Left:', pt: 'Faltam' },
      'postForm.chars': { es: 'caracteres', en: 'characters', pt: 'caracteres' },
      'postForm.maxChars50': { es: 'La longitud máxima es de 50 caracteres', en: 'Maximum length is 50 characters', pt: 'O comprimento máximo é de 50 caracteres' },
      'postForm.maxExp': { es: 'La experiencia máxima es 99 años', en: 'Maximum experience is 99 years', pt: 'A experiência máxima é 99 anos' },

      // ─── Success / Failure post ───
      'success.title': { es: '¡Publicación creada con éxito!', en: 'Listing created successfully!', pt: 'Anúncio criado com sucesso!' },
      'success.text': {
        es: 'Tu publicación ha sido registrada correctamente y está pendiente de aprobación. Muy pronto un administrador la revisará y, si todo está bien, estará visible en la plataforma. ¡Gracias por compartir tu servicio con la comunidad!',
        en: 'Your listing has been registered and is pending approval. An administrator will review it soon and, if everything is fine, it will be visible on the platform. Thanks for sharing your service with the community!',
        pt: 'Seu anúncio foi registrado e está pendente de aprovação. Em breve um administrador irá revisá-lo e, se tudo estiver bem, será visível na plataforma. Obrigado por compartilhar seu serviço com a comunidade!'
      },
      'success.home': { es: 'Inicio', en: 'Home', pt: 'Início' },
      'success.myPosts': { es: 'Mis avisos', en: 'My listings', pt: 'Meus anúncios' },
      'failure.title': { es: 'Error al crear la publicación.', en: 'Error creating listing.', pt: 'Erro ao criar anúncio.' },
      'failure.text': {
        es: 'Ocurrió un error al crear la publicación. Recordá que solo se permite una publicación por tipo de trabajo (por ejemplo, una como pintor, otra como plomero, etc.). Además, no es posible crear publicaciones desde pestañas en modo incógnito. Si no tenés otra publicación activa para este oficio, por favor cerrá el modo incógnito y volvé a intentarlo.',
        en: 'An error occurred while creating the listing. Remember that only one listing per job type is allowed (e.g., one as a painter, another as a plumber). Also, listings cannot be created from incognito tabs. If you don\'t have another active listing for this trade, please close incognito mode and try again.',
        pt: 'Ocorreu um erro ao criar o anúncio. Lembre-se que só é permitido um anúncio por tipo de trabalho (ex: um como pintor, outro como encanador). Além disso, não é possível criar anúncios em abas anônimas. Se você não tem outro anúncio ativo para este ofício, feche o modo anônimo e tente novamente.'
      }
    };
  }
}
