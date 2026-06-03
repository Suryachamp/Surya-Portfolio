// src/pages/Home.jsx
// Main page — composes all section components in order
import React from 'react'
import Navbar   from '../components/Navbar/Navbar'
import Hero     from '../components/Hero/Hero'
import About    from '../components/About/About'
import Skills   from '../components/Skills/Skills'
import Works    from '../components/Works/Works'
import Blogs    from '../components/Blogs/Blogs'
import Contact  from '../components/Contact/Contact'
import Footer   from '../components/Footer/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Works />
        {/* <Blogs /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home
