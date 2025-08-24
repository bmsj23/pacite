import { BookOpenCheck, Users, Target, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-28">
      {/* Hero Section */}
      <section className="relative bg-white py-20 px-6">
        <div className="w-[90%] max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-[var(--color-primary)]">Pacite</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed text-center">
            Empowering students, researchers, and writers with intelligent tools
            that make academic and professional writing effortless and accurate.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="w-[90%] max-w-6xl mx-auto">
          <div className="text-center mb-16">
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
             <span className="text-[var(--color-primary)]">Pacite&apos;s </span>Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-justify">
              Pacite believes that great ideas shouldn&apos;t be hindered by
              formatting complexities or citation challenges. Pacite exists to
              streamline your writing process, so you can focus on what matters
              most, which is your content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-justify mx-auto mb-4">
                <BookOpenCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Accuracy
              </h3>
              <p className="text-gray-600 text-center">
                Precise citations and formatting that meet academic standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Efficiency
              </h3>
              <p className="text-gray-600 text-center">
                Save time with automated tools that work faster than manual
                methods
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Accessibility
              </h3>
              <p className="text-gray-600 text-center">
                Free tools available to everyone, regardless of background or
                budget
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600 text-center">
                Cutting-edge technology that evolves with your writing needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="w-[90%] max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What Makes <span className="text-[var(--color-primary)]">Pacite</span> Special
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Intelligent Citation Generation
              </h3>
              <p className="text-gray-600 mb-4 text-justify">
                The citation generator doesn&apos;t just format, it understands.
                Simply paste a URL, DOI, or ISBN, and watch as we automatically
                extract and format all the necessary information according to
                your chosen style guide.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Supports APA, MLA, Chicago, and more</li>
                <li>• Works with websites, books, journals, and videos</li>
                <li>• Automatic metadata extraction</li>
                <li>• Export to multiple formats</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Comprehensive Writing Tools
              </h3>
              <p className="text-gray-600 mb-4 text-justify">
                Beyond citations, Pacite offers a growing suite of tools
                designed to support every aspect of your writing process, from
                initial drafts to final submissions.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Word and character counting</li>
                <li>• Grammar and spell checking</li>
                <li>• Text transformation tools</li>
                <li>• More tools added regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[var(--color-primary)]">
        <div className="w-[90%] max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-xl text-green-100 mb-8 text-center">
            Now, be one to experience the power of Pacite.
          </p>
          <Link
            href="/#tools"
            className="inline-block px-8 py-4 bg-white text-[var(--color-primary)] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Start Writing Better Today
          </Link>
        </div>
      </section>
    </div>
  );
}
