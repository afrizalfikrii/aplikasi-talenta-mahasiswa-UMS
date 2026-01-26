import { Mail, Linkedin } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8 border border-gray-100 dark:border-gray-700 flex flex-col items-center transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
        Tertarik dengan talenta ini?
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {/* Email Button */}
        <a
          href="mailto:example@gmail.com"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-red-500/30"
        >
          <Mail size={20} />
          Hubungi via Email
        </a>

        {/* LinkedIn Button */}
        <a
          href="#"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
        >
          <Linkedin size={20} />
          Connect di LinkedIn
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
