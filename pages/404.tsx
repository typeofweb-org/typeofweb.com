import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <h1 className="glitch" data-text="404 - Page Not Found">
          404 - Page Not Found
        </h1>
        <Link href="/">
          <a className="glitch-link motion-safe:hover:tracking-tighter block text-transparent font-light tracking-widest bg-gradient-to-r from-blue-500 to-pink-500 uppercase motion-safe:transition-all">
            Idź do strony głównej
          </a>
        </Link>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: /* css */ `
.glitch-link {
  font-family: 'Montserrat';
  -webkit-background-clip: text;
  background-clip: text;
  white-space: nowrap;
  font-size: max(1rem, 3vw);
  padding: 1rem 0;
  animation: move-bg 1000s infinite linear;
}

.glitch {
  position: relative;
  color: black;
  font-size: min(7vw, 20vh);
  white-space: nowrap;
}
  
.glitch::after,
.glitch::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px -2px rgb(225, 40, 153), 2px 2px rgb(225, 40, 153);
  color: white;
  animation: glitch-anim 1s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 2px #00fff9, 2px -2px #00fff9;
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@media (prefers-reduced-motion) {
  .glitch-link,
  .glitch::before,
  .glitch::after {
    animation: none;
  }
}

@keyframes move-bg {
  0% {
    background-position: 0vw;
  }
  100% {
    background-position: 10000vw;
  }
}

@keyframes glitch-anim {
  0% {
    font-family: 'Fira Sans';
    font-size: 1em;
    top: 0;
    clip: rect(21vw, 9999px, 1vw, 0);
 }
  5% {
    clip: rect(19vw, 9999px, 13vw, 0);
 }
  10% {
    clip: rect(17vw, 9999px, 6vw, 0);
 }
  15% {
    clip: rect(10vw, 9999px, 20vw, 0);
 }
  20% {
    clip: rect(10vw, 9999px, 9vw, 0);
 }
  25% {
    clip: rect(9vw, 9999px, 8vw, 0);
 }
  30% {
    clip: rect(3vw, 9999px, 15vw, 0);
 }
  35% {
    clip: rect(8vw, 9999px, 11vw, 0);
 }
  40% {
    clip: rect(5vw, 9999px, 21vw, 0);
 }
  45% {
    font-family: 'Fira Sans';
    font-size: 1em;
    top: 0;
    clip: rect(6vw, 9999px, 16vw, 0);
  }
  45.1% {
    font-family: 'Merriweather';
    font-size: 0.89em;
    top: 12px;
  }
  50% {
    clip: rect(6vw, 9999px, 8vw, 0);
 }
  55% {
    clip: rect(21vw, 9999px, 11vw, 0);
 }
  60% {
    clip: rect(1vw, 9999px, 10vw, 0);
 }
  65% {
    clip: rect(9vw, 9999px, 12vw, 0);
 }
  70% {
    clip: rect(18vw, 9999px, 1vw, 0);
 }
  75% {
    clip: rect(7vw, 9999px, 1vw, 0);
 }
  80% {
    clip: rect(17vw, 9999px, 3vw, 0);
 }
  85% {
    clip: rect(11vw, 9999px, 13vw, 0);
 }
  90% {
    clip: rect(10vw, 9999px, 16vw, 0);
 }
  95% {
    clip: rect(15vw, 9999px, 13vw, 0);
 }
  100% {
    clip: rect(3vw, 9999px, 5vw, 0);
    font-family: 'Merriweather';
    font-size: 0.89em;
    top: 12px;
 }
}
@keyframes glitch-anim2 {
  0% {
    clip: rect(8vw, 9999px, 13vw, 0);
 }
  5% {
    clip: rect(16vw, 9999px, 1vw, 0);
 }
  10% {
    clip: rect(20vw, 9999px, 4vw, 0);
 }
  15% {
    clip: rect(19vw, 9999px, 19vw, 0);
 }
  20% {
    clip: rect(11vw, 9999px, 15vw, 0);
 }
  25% {
    clip: rect(7vw, 9999px, 1vw, 0);
 }
  30% {
    clip: rect(19vw, 9999px, 1vw, 0);
 }
  35% {
    clip: rect(21vw, 9999px, 4vw, 0);
 }
  40% {
    clip: rect(13vw, 9999px, 16vw, 0);
 }
  45% {
    clip: rect(6vw, 9999px, 13vw, 0);
 }
  50% {
    clip: rect(3vw, 9999px, 2vw, 0);
 }
  55% {
    clip: rect(13vw, 9999px, 9vw, 0);
 }
  60% {
    clip: rect(1vw, 9999px, 13vw, 0);
 }
  65% {
    clip: rect(17vw, 9999px, 11vw, 0);
 }
  70% {
    clip: rect(2vw, 9999px, 21vw, 0);
 }
  75% {
    clip: rect(5vw, 9999px, 3vw, 0);
 }
  80% {
    clip: rect(13vw, 9999px, 1vw, 0);
 }
  85% {
    clip: rect(6vw, 9999px, 21vw, 0);
 }
  90% {
    clip: rect(13vw, 9999px, 4vw, 0);
 }
  95% {
    clip: rect(3vw, 9999px, 20vw, 0);
 }
  100% {
    clip: rect(2vw, 9999px, 17vw, 0);
 }
}
      `,
        }}
      />
    </>
  );
}
