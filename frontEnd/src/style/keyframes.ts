import { keyframes } from "styled-components";

import { colorTheme } from "./color-theme";

export const scaleUpDown = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 0 0 10px 0px ${colorTheme.orange400};
    }
    50% {
        transform: scale(1.1);
        box-shadow: 0 0 10px 5px ${colorTheme.orange400};
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 10px 0px ${colorTheme.orange400};
    }
`;

export const fadeIn = keyframes`
from {
    opacity: 0;
  }
to {
    opacity: 1;
  }
}
`;

export const fadeInDown = keyframes`
from {
    transform:translateY(-20px); 
    opacity: 0;
  }
to {
    opacity: 1;
  }
}
`;

export const fadeInUp = keyframes`
from {
    transform:translateY(20px); 
    opacity: 0;
  }
to {
    opacity: 1;
  }
}
`;

export const slideUp = keyframes`
from {
  transform: translateY(100%);
}
  to {
    transform: translateY(0);
  }
`;

export const widthUp = keyframes`
from {
  width: 0;
    flex: 0;
  }
to {
    width: 50%;
    flex: 1;
  }
}
`;

export const widthDown = keyframes`
from {
  width: 100%;
  flex: 1;
  }
to {
  width: 50%;
    flex: 1;
  }
}
`;

export const widthUp2 = keyframes`
  from {
    width: 0;
  }
  to {
    width: 30%;
  }
`;

export const widthDown2 = keyframes`
  from {
    width: 30%;
  }
  to {
    width: 10%;
  }
`;
