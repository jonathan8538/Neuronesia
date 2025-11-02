import React, { useEffect, useState } from "react";
import { updateUser } from "../query";

const TutorialModal = ({ isOpen, onClose, currentStep, onNext, onPrev, totalSteps, user }) => {
  const [highlightedElement, setHighlightedElement] = useState(null);

  const steps = [
    {
      title: "Welcome to Aivise!",
      content:
        "This tutorial will guide you through how to use our AI chatbot powered by voice input, document analytics, and personalized mentorship.",
      highlight: null,
    },
    {
      title: "Choose Your Mentor",
      content:
        "Before chatting, select a mentor from the dropdown list. Your mentor determines how the AI responds based on their philosophy and writings.",
      highlight: "select",
    },
    {
      title: "Ask Anything",
      content:
        "Use the input field at the bottom to type your question. Press Enter or click 'Send'. The AI will respond with insights tailored to your chosen mentor.",
      highlight: "input",
    },
    {
      title: "Use Voice Input",
      content:
        "Click the mic button to speak your question. Click ❌ Stop when you're done. The transcript will appear in the input field automatically.",
      highlight: "mic",
    },
    {
      title: "Upload CSV for Analytics",
      content:
        "Click the 'Analytics' button, then upload your CSV file. The AI will analyze your data and return visual insights with interpretation.",
      highlight: "analytics",
    },
    {
      title: "Upload CSV for Future Prediction 🔮",
      content:
        "Click the 'Predict' button, then upload your CSV file. The AI will analyze your data and generate future business predictions with clear explanations.",
      highlight: "predict",
    },
    {
      title: "Scrape News for Business Impact 📰",
      content:
        "Click the 'News' button, choose the news category you're interested in, and the AI will scrape recent articles. It will then analyze the content and provide insights on how these events might impact your business.",
      highlight: "news",
    },
    {
      title: "Manage Your Profile",
      content:
        "Click your profile picture at the top right to logout. Your session and data are managed securely with Supabase.",
      highlight: "profile",
    },
    {
      title: "You're All Set!",
      content:
        "Now you're ready to explore mentorship, analyze data, and chat with AI in a personalized way. Enjoy the journey!",
      highlight: null,
    },
  ];

  // Function to highlight elements
  const highlightElement = (selector) => {
    // Remove previous highlights
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
      el.style.position = '';
      el.style.zIndex = '';
      el.style.boxShadow = '';
      el.style.borderRadius = '';
    });

    if (!selector) return;

    // Use data-tutorial attributes for better element selection
    const element = document.querySelector(`[data-tutorial="${selector}"]`);

    if (element) {
      element.classList.add('tutorial-highlight');
      element.style.position = 'relative';
      element.style.zIndex = '1000';
      element.style.boxShadow = '0 0 0 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.5)';
      element.style.borderRadius = '8px';
      setHighlightedElement(element);

      // Scroll element into view if needed
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  };

  // Effect to handle highlighting when step changes
  useEffect(() => {
    if (isOpen) {
      const currentStepData = steps[currentStep];
      highlightElement(currentStepData.highlight);
    } else {
      // Clean up highlights when modal closes
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
        el.style.position = '';
        el.style.zIndex = '';
        el.style.boxShadow = '';
        el.style.borderRadius = '';
      });
    }
  }, [currentStep, isOpen]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
        el.style.position = '';
        el.style.zIndex = '';
        el.style.boxShadow = '';
        el.style.borderRadius = '';
      });
    };
  }, []);

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  const handleFinish = () => {
    if (user && user.id) {
      updateUser(user.id, true); // panggil updateUser dengan user.id dan true
    }
    onClose(); // tutup modal
  };


  return (
    <>
      {/* Overlay with cutout for highlighted element */}
      <div className="fixed inset-0 z-40">
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-transparent bg-opacity-0"></div>
      </div>

      {/* Modal positioned to avoid covering highlighted elements */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none font-Poppins">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg pointer-events-auto mx-4 border-1">
          {/* Step indicator */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-black' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {totalSteps}
            </span>
          </div>

          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {currentStepData.title}
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {currentStepData.content}
          </p>

          <div className="flex justify-between">
            <button
              onClick={onPrev}
              disabled={currentStep === 0}
              className="bg-[#000000] hover:bg-white hover:border-1 hover:border-black hover:text-black duration-300 text-white cursor-pointer px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={onNext}
                className="bg-white border-1 border-black text-black hover:bg-black hover:text-white cursor-pointer px-4 py-2 rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="bg-white border-1 border-black text-black hover:bg-gray cursor-pointer px-4 py-2 rounded-lg transition-colors"
              >
                Finish
              </button>
            )}
          </div>

          {/* Skip tutorial option */}
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Skip tutorial
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialModal;