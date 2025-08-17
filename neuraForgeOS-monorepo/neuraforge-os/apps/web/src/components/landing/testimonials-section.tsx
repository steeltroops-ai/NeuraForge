const testimonials = [
  {
    body: 'NeuraForge OS has revolutionized how our lab conducts research. The AI suggestions have led to breakthrough discoveries we never would have considered.',
    author: {
      name: 'Dr. Sarah Chen',
      handle: 'sarahchen',
      imageUrl: '/avatars/sarah-chen.jpg',
      title: 'Professor of Computer Science, MIT',
    },
  },
  {
    body: 'The collaborative features are incredible. We can work with researchers across the globe as if they were sitting right next to us.',
    author: {
      name: 'Prof. Michael Rodriguez',
      handle: 'mrodriguez',
      imageUrl: '/avatars/michael-rodriguez.jpg',
      title: 'Research Director, Stanford AI Lab',
    },
  },
  {
    body: 'Version control for research was something I never knew I needed. Now I can\'t imagine working without it.',
    author: {
      name: 'Dr. Emily Watson',
      handle: 'emilywatson',
      imageUrl: '/avatars/emily-watson.jpg',
      title: 'Senior Researcher, Google DeepMind',
    },
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by leading researchers
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, testimonialIdx) => (
              <div
                key={testimonialIdx}
                className="rounded-2xl bg-gray-50 p-8 text-sm leading-6"
              >
                <blockquote className="text-gray-900">
                  <p>"{testimonial.body}"</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                    <div className="text-gray-600">{testimonial.author.title}</div>
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}