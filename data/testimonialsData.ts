export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    quote: "دقة الألوان في علب منتجاتنا كانت مطابقة 100% لدرجات البانتون، وتتبع الشحنة وفر علينا قلق المتابعة حتى وصول الكراتين للمخازن.",
    author: "م. شريف المنياوي",
    role: "مدير العمليات والتوريدات",
    company: "مجموعة المنياوي للتصنيع الغذائي",
    image: "/images/testimonial-skip-01.webp",
  },
  {
    id: "2",
    quote: "دقة تشطيب السلوفان المخملي والبصمة الذهبية في الكروت وبروفايل شركتنا فاقت التوقعات، وسرعة التنفيذ والتسليم كانت في الموعد تماماً.",
    author: "د. هبة الشاذلي",
    role: "رئيسة قطاع التسويق والبراندينج",
    company: "مؤسسة زينيث الدوائية",
    image: "/images/testimonial-skip-02.webp",
  },
  {
    id: "3",
    quote: "طبعنا 20,000 كيس ورقي مع شريط ستان لمعارضنا في مصر ودبي، الجودة والتشطيب فخامة تليق ببراند أزياء راقي.",
    author: "كريم عبد الباسط",
    role: "مؤسس ومدير إبداعي",
    company: "أورا فاشون إيجيبت",
    image: "/images/testimonial-skip-01.webp",
  },
];
