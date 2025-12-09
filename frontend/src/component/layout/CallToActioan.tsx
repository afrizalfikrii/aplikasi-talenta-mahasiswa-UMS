const CallToAction = () => {
  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-8 border border-gray-200 flex flex-col items-center">
      <h2 className="text-lg font-medium text-gray-800 mb-6">
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
