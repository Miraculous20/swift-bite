const AboutUs = () => {
  return (
    <section id="about-us" className="px-4 py-16 bg-white md:px-8 lg:px-16">
      <div className="container max-w-5xl mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Image Column */}
          <div>
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="A diverse team collaborating around a table"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          {/* Content Column */}
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-800">About Swift-Bite</h1>
            <p className="mt-2 text-lg font-semibold text-orange-500">Connecting Uyo, One Delicious Meal at a Time.</p>
            <p className="mt-4 text-gray-600">
              Welcome to Swift-Bite, your premier food delivery partner dedicated to bringing the rich and diverse flavors of Uyo right to your doorstep. We believe that great food is an experience, and our mission is to make that experience accessible, convenient, and delightful for everyone.
            </p>
          </div>
        </div>

        <div className="mt-16 text-left">
          <h2 className="text-3xl font-bold text-gray-800">Our Journey</h2>
          <p className="mt-4 text-gray-600">
            Our story began in the vibrant streets of Uyo. Founded with a passion for technology and a love for local cuisine, Swift-Bite was born from a simple idea: that everyone should have easy access to the best food their city has to offer, no matter how busy their day is.
          </p>
          <p className="mt-4 text-gray-600">
            We saw the incredible and dynamic culinary landscape of Uyo—from legendary local bukkas serving authentic delicacies to exclusive restaurants crafting modern masterpieces—and knew this was where we needed to be. We launched our operations in Uyo to celebrate, elevate, and share the unique tastes of Akwa Ibom with the community.
          </p>

          <h2 className="mt-12 text-3xl font-bold text-gray-800">What We Do</h2>
          <p className="mt-4 text-gray-600">
            We are more than just a delivery app; we are a three-sided marketplace built on a foundation of partnership and trust.
          </p>
          <ul className="mt-4 space-y-4 text-gray-600 list-disc list-inside">
            <li><strong>For Our Customers:</strong> We offer a carefully curated selection of Uyo’s best eateries on a seamless, user-friendly platform. Whether you’re craving a hearty local meal, a quick snack, or a gourmet dinner, Swift-Bite connects you to the food you love, delivered swiftly and reliably.</li>
            <li><strong>For Our Eatery Partners:</strong> We are a growth engine for local restaurants. By partnering with us, eateries gain access to a wider audience, a streamlined ordering process, and the digital tools needed to thrive in today’s competitive market. We are committed to helping our local businesses succeed.</li>
            <li><strong>For Our Delivery Agents:</strong> Our dedicated team of delivery agents is the backbone of our service. We provide them with flexible opportunities and the technology needed to perform deliveries efficiently, ensuring that your food arrives fresh, hot, and on time.</li>
          </ul>

          <h2 className="mt-12 text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-gray-600">
            Our mission is to make food discovery exciting and delivery effortless. We are building a community that celebrates Uyo&apos;s culinary diversity, supports local entrepreneurs, and brings people together over the simple joy of a shared meal.
          </p>
          <p className="mt-4 text-gray-600">
            Ready to explore the taste of Uyo? Browse our partner restaurants and let us bring your next favorite meal to you. Thank you for being a part of our story.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;