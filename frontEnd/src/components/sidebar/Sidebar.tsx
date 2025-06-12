import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    id: number;
    title: string;
    path: string;
  }>;
}

export const Sidebar = ({ isOpen, onClose, menuItems}: SidebarProps) => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle>메뉴</SidebarTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </SidebarHeader>
        <SidebarContent>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              onClick={() => handleNavigation(item.path)}
            >
              {item.title}
            </SidebarItem>
          ))}
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-300px'};
  width: 300px;
  height: 100%;
  background-color: white;
  z-index: 101;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${colorTheme.blue100};
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  color: ${colorTheme.blue900};
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: ${colorTheme.blue900};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SidebarItem = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  color: ${colorTheme.blue900};
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${colorTheme.blue100};
  }
`; 