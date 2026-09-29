import { forwardRef } from "react";
import styles from "./loading-architecture.module.css";

type DrawLineProps = React.SVGProps<SVGPathElement> & {
  phase: number;
  tone?: "guide" | "structure" | "detail" | "ground" | "atmosphere" | "water";
};

function DrawPath({ phase, tone = "structure", ...props }: DrawLineProps) {
  return (
    <path
      {...props}
      data-draw-line
      data-draw-phase={phase}
      className={`${styles.line} ${styles[tone]}`}
    />
  );
}

const LoadingArchitecture = forwardRef<SVGSVGElement>(function LoadingArchitecture(_, ref) {
  return (
    <svg
      ref={ref}
      className={styles.scene}
      viewBox="0 0 1120 600"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="reflection-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="black" stopOpacity="0" />
          <stop offset="0.52" stopColor="white" stopOpacity="0.4" />
          <stop offset="1" stopColor="white" stopOpacity="0.86" />
        </linearGradient>
        <mask
          id="reflection-mask"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1120"
          height="315"
        >
          <rect x="0" y="0" width="1120" height="315" fill="url(#reflection-fade)" />
        </mask>
        <filter id="water-distortion" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.034"
            numOctaves="2"
            seed="12"
            result="water-noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="water-noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>

      <g>
        <DrawPath phase={0} tone="guide" d="M18 168C192 111 326 137 474 91S789 32 1102 105" />
        <DrawPath phase={0} tone="guide" d="M17 211C180 164 337 197 496 142S820 83 1104 154" />
        <DrawPath phase={0} tone="atmosphere" d="M38 111H67C69 97 80 88 94 88C106 88 116 95 120 106C126 101 133 98 141 98C154 98 164 107 166 119H183" />
        <DrawPath phase={2} tone="atmosphere" d="M486 65H511C513 54 522 47 533 47C543 47 552 53 555 62C560 58 566 56 572 56C583 56 592 63 594 73H614" />
        <DrawPath phase={3} tone="atmosphere" d="M766 108H790C792 96 802 89 814 89C824 89 833 95 837 104C842 100 848 98 854 98C865 98 874 105 876 115H898" />
        <DrawPath phase={0} tone="atmosphere" d="M220 80A4 4 0 1 0 220 72A4 4 0 1 0 220 80Z" />
        <DrawPath phase={2} tone="atmosphere" d="M666 91A3 3 0 1 0 666 85A3 3 0 1 0 666 91Z" />
        <DrawPath phase={4} tone="atmosphere" d="M1066 103A4 4 0 1 0 1066 95A4 4 0 1 0 1066 103Z" />
        <DrawPath phase={1} tone="atmosphere" d="M315 91C321 85 327 85 333 91C339 85 345 85 351 91" />
        <DrawPath phase={2} tone="atmosphere" d="M632 119C637 114 642 114 647 119C652 114 657 114 662 119" />
        <DrawPath phase={3} tone="atmosphere" d="M901 69C907 63 913 63 919 69C925 63 931 63 937 69" />
        <DrawPath phase={4} tone="atmosphere" d="M1019 132C1023 128 1027 128 1031 132C1035 128 1039 128 1043 132" />
      </g>

      <g id="landmark-lineup">
        {/* Eiffel Tower · Paris */}
        <g>
          <DrawPath phase={0} d="M38 310H180" />
          <DrawPath phase={0} d="M62 310C82 283 89 245 96 207L112 73" />
          <DrawPath phase={0} d="M162 310C142 283 135 245 128 207L112 73" />
          <DrawPath phase={0} d="M112 73V52M108 59L112 51L116 59" />
          <DrawPath phase={0} d="M75 273H149M85 235H139M94 195H130M101 151H123M106 110H118" />
          <DrawPath phase={0} tone="detail" d="M68 298L149 273M156 298L75 273M82 263L139 235M142 263L85 235M91 224L130 195M133 224L94 195" />
          <DrawPath phase={0} tone="detail" d="M98 183L123 151M126 183L101 151M104 139L118 110M120 139L106 110" />
          <DrawPath phase={0} d="M70 310C83 289 96 283 112 283C128 283 141 289 154 310" />
          <DrawPath phase={0} tone="detail" d="M98 310V291M126 310V291" />
        </g>

        {/* Dravidian temple gopuram · Tamil Nadu */}
        <g>
          <DrawPath phase={1} d="M190 310H378" />
          <DrawPath phase={1} d="M200 310V277H368V310" />
          <DrawPath phase={1} d="M212 277V243H356V277" />
          <DrawPath phase={1} d="M225 243V210H343V243" />
          <DrawPath phase={1} d="M238 210V178H330V210" />
          <DrawPath phase={1} d="M251 178V148H317V178" />
          <DrawPath phase={1} d="M264 148V120H304V148" />
          <DrawPath phase={1} d="M276 120V94H292V120" />
          <DrawPath phase={1} d="M273 94C274 82 278 74 284 63C290 74 294 82 295 94Z" />
          <DrawPath phase={1} d="M284 63V46M280 53L284 45L288 53" />
          <DrawPath phase={1} tone="detail" d="M207 286H361M219 252H349M232 219H336M245 187H323M258 157H310M271 129H297" />
          <DrawPath phase={1} tone="detail" d="M218 277L225 243M350 277L343 243M231 243L238 210M337 243L330 210M244 210L251 178M324 210L317 178" />
          <DrawPath phase={1} tone="detail" d="M257 178L264 148M311 178L304 148M270 148L276 120M298 148L292 120" />
          <DrawPath phase={1} d="M263 310V291C263 263 305 263 305 291V310" />
          <DrawPath phase={1} tone="detail" d="M270 310V291C270 274 298 274 298 291V310" />
          <DrawPath phase={1} tone="detail" d="M219 297V288C219 280 230 280 230 288V297M241 297V288C241 280 252 280 252 288V297M316 297V288C316 280 327 280 327 288V297M338 297V288C338 280 349 280 349 288V297" />
          <DrawPath phase={1} tone="detail" d="M240 234L247 221L254 234M263 234L270 221L277 234M291 234L298 221L305 234M314 234L321 221L328 234" />
          <DrawPath phase={1} tone="detail" d="M259 201L266 188L273 201M280 201L284 187L288 201M295 201L302 188L309 201" />
          <DrawPath phase={1} tone="detail" d="M271 169L277 157L284 169M284 169L291 157L297 169M276 140L284 128L292 140" />
        </g>

        {/* Taj Mahal · Agra */}
        <g>
          <DrawPath phase={2} d="M391 310H735" />
          <DrawPath phase={2} d="M438 310V190H682V310" />
          <DrawPath phase={2} d="M425 190H695M443 205H677" />
          <DrawPath phase={2} d="M486 190C490 158 515 143 546 132C551 119 557 105 560 85C564 105 570 119 575 132C606 143 631 158 635 190" />
          <DrawPath phase={2} d="M560 85V58M557 61L560 52L563 61" />
          <DrawPath phase={2} d="M446 190C449 168 465 157 484 151C487 163 490 176 490 190M630 190C630 176 633 163 636 151C655 157 671 168 674 190" />
          <DrawPath phase={2} d="M463 151V134M460 139L463 132L466 139M657 151V134M654 139L657 132L660 139" />
          <DrawPath phase={2} d="M395 310V145H427V310M693 310V145H725V310" />
          <DrawPath phase={2} d="M393 145H429L424 128H398ZM691 145H727L722 128H696Z" />
          <DrawPath phase={2} d="M400 128L411 83L422 128M698 128L709 83L720 128" />
          <DrawPath phase={2} d="M411 83V64M408 69L411 62L414 69M709 83V64M706 69L709 62L712 69" />
          <DrawPath phase={2} tone="detail" d="M399 169H423M399 225H423M399 274H423M697 169H721M697 225H721M697 274H721" />
          <DrawPath phase={2} tone="detail" d="M404 207V187C404 174 418 174 418 187V207M702 207V187C702 174 716 174 716 187V207" />
          <DrawPath phase={2} tone="detail" d="M404 260V240C404 227 418 227 418 240V260M702 260V240C702 227 716 227 716 240V260" />
          <DrawPath phase={2} d="M518 310V252C518 194 602 194 602 252V310" />
          <DrawPath phase={2} tone="detail" d="M528 310V253C528 208 592 208 592 253V310" />
          <DrawPath phase={2} tone="detail" d="M457 299V272C457 252 480 252 480 272V299M640 299V272C640 252 663 252 663 272V299" />
          <DrawPath phase={2} tone="detail" d="M457 240V222C457 208 476 208 476 222V240M644 240V222C644 208 663 208 663 222V240" />
          <DrawPath phase={2} tone="detail" d="M491 299V276C491 260 508 260 508 276V299M612 299V276C612 260 629 260 629 276V299" />
          <DrawPath phase={2} tone="detail" d="M447 251H498M622 251H673M447 304H673" />
          <DrawPath phase={2} tone="detail" d="M548 259H572M548 276H572M548 293H572" />
        </g>

        {/* Five-storey pagoda · Kyoto */}
        <g>
          <DrawPath phase={3} d="M752 310H918" />
          <DrawPath phase={3} d="M806 310V274H864V310" />
          <DrawPath phase={3} d="M778 274C800 271 816 262 835 250C854 262 870 271 892 274" />
          <DrawPath phase={3} d="M795 250H875M803 250V226H867V250" />
          <DrawPath phase={3} d="M781 226C801 223 817 215 835 203C853 215 869 223 889 226" />
          <DrawPath phase={3} d="M801 203H869M808 203V180H862V203" />
          <DrawPath phase={3} d="M786 180C804 177 819 169 835 157C851 169 866 177 884 180" />
          <DrawPath phase={3} d="M805 157H865M812 157V135H858V157" />
          <DrawPath phase={3} d="M793 135C808 132 822 124 835 112C848 124 862 132 877 135" />
          <DrawPath phase={3} d="M811 112H859M818 112V91H852V112" />
          <DrawPath phase={3} d="M802 91C814 88 825 80 835 68C845 80 856 88 868 91" />
          <DrawPath phase={3} d="M835 68V43M831 51L835 42L839 51" />
          <DrawPath phase={3} tone="detail" d="M815 310V282M835 310V278M855 310V282M812 250V230M835 250V226M858 250V230" />
          <DrawPath phase={3} tone="detail" d="M816 203V183M835 203V180M854 203V183M820 157V138M835 157V135M850 157V138M824 112V94M846 112V94" />
          <DrawPath phase={3} tone="detail" d="M778 274L772 268M892 274L898 268M781 226L775 220M889 226L895 220M786 180L780 174M884 180L890 174M793 135L787 129M877 135L883 129" />
        </g>

        {/* Elizabeth Tower · London */}
        <g>
          <DrawPath phase={4} d="M930 310H1094" />
          <DrawPath phase={4} d="M966 310V143H1040V310" />
          <DrawPath phase={4} d="M960 143H1046L1038 122H968Z" />
          <DrawPath phase={4} d="M970 122L980 94H1028L1038 122" />
          <DrawPath phase={4} d="M980 94L1004 54L1028 94" />
          <DrawPath phase={4} d="M1004 54V31M1000 39L1004 30L1008 39" />
          <DrawPath phase={4} d="M973 169H1033M973 218H1033M973 270H1033" />
          <DrawPath phase={4} d="M1004 195A19 19 0 1 0 1004 157A19 19 0 1 0 1004 195Z" />
          <DrawPath phase={4} tone="detail" d="M1004 176L1004 163M1004 176L1015 182" />
          <DrawPath phase={4} tone="detail" d="M982 209V200M992 209V200M1016 209V200M1026 209V200" />
          <DrawPath phase={4} tone="detail" d="M980 256V233C980 219 993 219 993 233V256M1015 256V233C1015 219 1028 219 1028 233V256" />
          <DrawPath phase={4} d="M980 310V285C980 270 993 270 993 285V310M1015 310V285C1015 270 1028 270 1028 285V310" />
          <DrawPath phase={4} d="M930 310V264H966M1040 264H1094V310" />
          <DrawPath phase={4} d="M938 264V246H954V264M1052 264V246H1068V264" />
          <DrawPath phase={4} d="M936 246L946 229L956 246M1050 246L1060 229L1070 246" />
          <DrawPath phase={4} tone="detail" d="M942 295V279H954V295M1051 295V279H1063V295M1072 295V279H1084V295" />
          <DrawPath phase={4} tone="detail" d="M976 143V128M989 143V128M1019 143V128M1032 143V128" />
        </g>

        {/* Small trees connect the individual landmarks into one shoreline. */}
        <g>
          <DrawPath phase={1} d="M184 310V286" />
          <DrawPath phase={1} tone="detail" d="M184 289C171 289 169 274 177 269C174 257 189 251 195 261C207 259 211 274 203 280C205 291 192 296 184 289Z" />
          <DrawPath phase={2} d="M383 310V291" />
          <DrawPath phase={2} tone="detail" d="M383 294C372 294 369 281 376 276C374 267 386 262 392 270C402 270 405 282 398 288C398 297 389 300 383 294Z" />
          <DrawPath phase={3} d="M742 310V287" />
          <DrawPath phase={3} tone="detail" d="M742 290C730 290 727 276 735 271C732 261 746 255 752 264C763 264 767 277 759 283C760 293 749 298 742 290Z" />
          <DrawPath phase={4} d="M922 310V289" />
          <DrawPath phase={4} tone="detail" d="M922 292C911 292 909 279 916 274C914 265 926 260 932 268C942 268 945 280 938 286C938 295 928 299 922 292Z" />
        </g>
      </g>

      <use
        href="#landmark-lineup"
        className={styles.reflection}
        transform="translate(0 628) scale(1 -1)"
        mask="url(#reflection-mask)"
        filter="url(#water-distortion)"
        aria-hidden="true"
      />

      <g>
        <DrawPath phase={0} tone="ground" d="M18 314C195 311 328 317 474 314S790 310 1102 314" />
        <DrawPath phase={2} tone="water" d="M30 329C86 321 126 336 182 329S278 336 334 329S430 336 486 329" />
        <DrawPath phase={3} tone="water" d="M506 329C560 321 602 336 656 329S750 336 804 329S898 336 952 329S1046 336 1094 329" />
        <DrawPath phase={3} tone="water" d="M82 354C131 347 168 361 217 354S303 361 352 354M678 354C727 347 764 361 813 354S899 361 948 354" />
        <DrawPath phase={4} tone="water" d="M251 381C294 375 326 387 369 381S444 387 487 381M802 381C845 375 877 387 920 381" />
        <DrawPath phase={4} tone="water" d="M75 426C113 420 143 432 181 426M512 412C550 406 580 418 618 412M944 435C982 429 1012 441 1050 435" />
      </g>
    </svg>
  );
});

export default LoadingArchitecture;
