import { ContainerScroll } from '../../../components/ui/container-scroll-animation';

export function DevCatalystHeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white mb-4">
              Experience the Future of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Developer Education
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              Join thousands of students building real-world projects, gaining industry experience,
              and accelerating their tech careers
            </p>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Students collaborating"
              className="rounded-lg object-cover w-full h-32 md:h-40"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <img
              src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Coding workspace"
              className="rounded-lg object-cover w-full h-32 md:h-40"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Modern tech setup"
              className="rounded-lg object-cover w-full h-28 md:h-32"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 md:p-6 h-48 md:h-52 flex flex-col justify-center items-center text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-sm md:text-base text-slate-300">Active Students</div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-2 mt-4">50+</div>
              <div className="text-sm md:text-base text-slate-300">Projects Completed</div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
