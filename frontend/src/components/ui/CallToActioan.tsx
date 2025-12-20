const CallToAction = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 shadow-md rounded-2xl p-8 border border-gray-200 dark:border-slate-800 flex flex-col items-center transition-colors">
      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-6 transition-colors">
        Tertarik dengan talenta ini?
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {/* Email Button */}
        <a
          href="mailto:example@gmail.com"
          className="flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          <img src="/mail.png" className="h-7 w-auto" alt="email" />
          Hubungi via Email
        </a>

        {/* LinkedIn Button */}
        <a
          href="#"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          <img src="/linkedin.png" className="h-6" alt="LinkedIn" />
          Connect di LinkedIn
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
