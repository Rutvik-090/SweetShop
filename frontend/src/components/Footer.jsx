const Footer = () => {
  return (
    <footer className="w-full h-[5rem] flex flex-row items-center justify-center border-t-2 gap-[20rem]">
      <div className="font-medium">
        <ul className="list-inside list-disc">
          <li>Contact Us</li>
          <li>About Us</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div className="font-medium">
        <p>
          &copy; {new Date().getFullYear()} Sweet Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
