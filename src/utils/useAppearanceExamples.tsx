/**
 * useAppearance Hook Examples
 * 
 * This file demonstrates how to use the appearance context in your components.
 */

import { useAppearance } from '../context/AppearanceContext';

// Example 1: Simple display of current settings
export const DisplayCurrentSettings = () => {
  const { preferences } = useAppearance();

  return (
    <div>
      <p>Font Size: {preferences.fontSize}px</p>
      <p>Font Family: {preferences.fontFamily}</p>
    </div>
  );
};

// Example 2: Component that reacts to font size changes
export const DynamicSizedText = ({ children }: { children: React.ReactNode }) => {
  const { preferences } = useAppearance();
  
  // Create sizes relative to base font size
  const headingSize = preferences.fontSize * 1.5;
  
  return (
    <h1 style={{ fontSize: `${headingSize}px`, transition: 'font-size 0.3s ease' }}>
      {children}
    </h1>
  );
};

// Example 3: Component with custom font family styling
export const CustomFontText = ({ children }: { children: React.ReactNode }) => {
  const { preferences } = useAppearance();
  
  const fontMapping = {
    inter: "'Inter', sans-serif",
    poppins: "'Poppins', sans-serif",
    roboto: "'Roboto', sans-serif",
  };

  return (
    <span style={{ fontFamily: fontMapping[preferences.fontFamily] }}>
      {children}
    </span>
  );
};

// Example 4: Component with button to update font size
export const FontSizeIncreaseButton = () => {
  const { preferences, updateFontSize } = useAppearance();

  const handleIncrease = () => {
    updateFontSize(preferences.fontSize + 1);
  };

  return (
    <button onClick={handleIncrease}>
      Increase Font Size (Current: {preferences.fontSize}px)
    </button>
  );
};

// Example 5: Component with font family selector
export const FontFamilySelector = () => {
  const { preferences, updateFontFamily } = useAppearance();

  return (
    <div>
      <p>Current Font: {preferences.fontFamily}</p>
      <button onClick={() => updateFontFamily('inter')}>Use Inter</button>
      <button onClick={() => updateFontFamily('poppins')}>Use Poppins</button>
      <button onClick={() => updateFontFamily('roboto')}>Use Roboto</button>
    </div>
  );
};

// Example 6: Component with reset functionality
export const ResetButton = () => {
  const { resetToDefaults } = useAppearance();

  return (
    <button onClick={resetToDefaults}>
      Reset All Settings to Defaults
    </button>
  );
};

// Example 7: Complex component using all settings
export const AdvancedExample = () => {
  const { preferences, updateFontSize, updateFontFamily, resetToDefaults } = useAppearance();

  return (
    <div>
      <h2>Appearance Control Panel</h2>
      
      <section>
        <h3>Current Settings</h3>
        <p>Font Size: {preferences.fontSize}px</p>
        <p>Font Family: {preferences.fontFamily}</p>
      </section>

      <section>
        <h3>Adjust Font Size</h3>
        <button onClick={() => updateFontSize(preferences.fontSize - 2)}>
          Smaller
        </button>
        <span>{preferences.fontSize}px</span>
        <button onClick={() => updateFontSize(preferences.fontSize + 2)}>
          Larger
        </button>
      </section>

      <section>
        <h3>Change Font</h3>
        <button 
          onClick={() => updateFontFamily('inter')}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Inter
        </button>
        <button 
          onClick={() => updateFontFamily('poppins')}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Poppins
        </button>
        <button 
          onClick={() => updateFontFamily('roboto')}
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Roboto
        </button>
      </section>

      <section>
        <button onClick={resetToDefaults}>
          Reset to Defaults
        </button>
      </section>
    </div>
  );
};

/**
 * Usage in your components:
 * 
 * import { useAppearance } from '../context/AppearanceContext';
 * 
 * export const MyComponent = () => {
 *   const { preferences, updateFontSize, updateFontFamily, resetToDefaults } = useAppearance();
 *   
 *   // You now have access to:
 *   // - preferences.fontSize (number: 12-24)
 *   // - preferences.fontFamily ('inter' | 'poppins' | 'roboto')
 *   // - updateFontSize(number) - updates font size
 *   // - updateFontFamily(string) - updates font family
 *   // - resetToDefaults() - resets to defaults
 *   
 *   return (
 *     <div>
 *       Current size: {preferences.fontSize}px
 *     </div>
 *   );
 * };
 */
