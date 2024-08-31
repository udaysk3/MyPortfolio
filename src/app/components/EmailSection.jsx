"use client";
import React from "react";
import GithubIcon from "../../../public/github-icon.svg";
import UpworkIcon from "../../../public/upwork-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import GmailIcon from "../../../public/gmail-icon.svg";

import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  return (
    <section className="text-white" id="connect">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="relative md:col-span-1">
          <Image 
            src="/images/connect1.png" 
            width={500} 
            height={500} 
            alt="Connect Image" 
            className="hidden md:block"
          />
          {/* Show on small devices */}
          <div className="md:hidden flex justify-center mt-5">
            <Image 
              src="/images/connect1.png" 
              width={300} 
              height={300} 
              alt="Connect Image" 
            />
          </div>
        </div>
        <div className="relative mt-5 pt-5 md:mt-0 text-left flex flex-col h-full md:order-last">
          <div className="z-10">
            <h5 className="text-xl mt-10 font-bold text-white my-2 md:grid md:grid-cols-4 items-center">
              Let&apos;s Connect 
              <Image src="/images/connect.png" width={50} height={50} alt="Connect Icon" />
            </h5>
            <p className="text-[#ADB7BE] mb-4 max-w-md">
              I&apos;m currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            <div className="socials flex flex-row gap-2">
            <Link href="https://www.upwork.com/freelancers/~01f8bcbcd3babc7b1c" target="_blank">
                <Image src={UpworkIcon} alt="upwork Icon" />
              </Link>
              <Link href="https://github.com/udaysk3" target="_blank">
                <Image src={GithubIcon} alt="Github Icon" />
              </Link>
              <Link href="https://linkedin.com/in/udaysk3" target="_blank">
                <Image src={LinkedinIcon} alt="Linkedin Icon" />
              </Link>
              <Link href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=burluudaysantoshkumar3@gmail.com@email.com&subject=MISSED%20CALL%20EZTRADER&body=Hello%20Uday%2C%0A%0A%7B%7B%20Write%20your%20concern%20here%20%7D%7D%0A%0ABest%2C%0A%7B%7B%20your%20name%7D%7D%0A%7B%7B%20your%20contact%20information%20%7D%7D%0A" target="_blank">
                <Image src={GmailIcon} alt="Gmail Icon" />
              </Link>
              
            </div>
          </div>
          {/* New image at the bottom-right corner */}
          <div className="hidden md:block absolute bottom-0 right-0 p-4">
            <Image src="/images/connect3.png" width={300} height={300} alt="New Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
