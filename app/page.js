"use client"
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router=useRouter();
  return (
    <div>
      <Head>
        <title>Mock Interview Module</title>
        <meta name="description" content="Prepare for your next interview with confidence" />
      </Head>

      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 shadow-lg">
        <div className='flex justify-between align-center'>
        <div className='flex font-bold'><Image src={'/logo.svg'} width={80} height={60} alt='logo' className='rounded-lg'/>
            <h2 className='mt-4 text-3xl text-black font-bold hover:cursor-pointer'>CareerElevate<span className='bg-gradient-to-r from-orange-400 to-green-500 text-black p-0.6 rounded-lg'></span></h2></div>
            <div className='flex gap-3'>
            <Button onClick={()=>router.push('/dashboard')} className="font-bold bg-white text-black hover:bg-black hover:text-white transition-all mt-1.6">Login</Button>
            <Button onClick={()=>router.push('/dashboard')} className="font-bold bg-white text-black hover:bg-black hover:text-white transition-all mt-1.6">Sign Up</Button>
            </div>
            </div>
      </header>

      <section className="bg-cover bg-center text-white h-screen flex flex-col justify-center items-center text-center p-5" style={{ backgroundImage: 'url(/hero-transformed.webp)' }}>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-md">Ace Your Next Interview</h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed">Simulate real interviews and get personalized feedback to boost your confidence.</p>
        <a href="/dashboard" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 px-8 rounded-full text-xl hover:shadow-lg bg-black transform hover:scale-105 transition">Start Now</a>
      </section>

      <section id="features" className="container mx-auto py-16 px-5">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Tailored Feedback</h3>
            <p className="text-gray-600">Identify your strengths and areas for improvement with detailed analysis.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Real-time Scenarios</h3>
            <p className="text-gray-600">Experience interviews in real-time settings to enhance your preparedness.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Extensive Question Bank</h3>
            <p className="text-gray-600">Access a diverse range of questions tailored for various industries.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-gray-100 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">User Testimonials</h2>
        <div className="container mx-auto flex flex-wrap justify-center">
          <div className="max-w-md bg-white p-6 rounded-lg shadow-lg m-4">
            <p className="italic mb-4">"This platform boosted my confidence and helped me land my dream job."</p>
            <span className="text-blue-500 font-semibold">- Alex Johnson</span>
          </div>
          <div className="max-w-md bg-white p-6 rounded-lg shadow-lg m-4">
            <p className="italic mb-4">"The feedback I received was invaluable. Highly recommend!"</p>
            <span className="text-blue-500 font-semibold">- Maria Gonzalez</span>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">Have any questions? Reach us at <a href="mailto:support@mockinterview.com" className="underline">support@mockinterview.com</a></p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
