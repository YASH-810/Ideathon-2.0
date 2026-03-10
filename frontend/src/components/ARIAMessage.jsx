export default function ARIAMessage({ text }) {
  return (
    <div className="flex w-full justify-start mb-6 animate-fade-in-up">
      <div className="flex items-end max-w-[80%] md:max-w-[70%] space-x-3">
        <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-blue-200">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="bg-white px-6 py-4 rounded-3xl rounded-bl-sm shadow-md border border-blue-50 text-blue-900 text-lg md:text-xl font-medium leading-relaxed">
          {text}
        </div>
      </div>
    </div>
  );
}
