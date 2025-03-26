document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const xmlInput = document.getElementById('xmlInput');
    const jsonOutput = document.getElementById('jsonOutput');
    const convertBtn = document.getElementById('convertBtn');
    const loadSampleBtn = document.getElementById('loadSampleBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const includeEmptyQuotes = document.getElementById('includeEmptyQuotes');
    const prettyPrint = document.getElementById('prettyPrint');
    const customPrefix = document.getElementById('customPrefix');
    
    // Sample XML
    const sampleXml = `<process name="__selection__UK_CP_PCS_CollectorV3">
    <stage stageid="0d5d1ffc-8422-4690-9f37-e8319f0d4a03" name="Cast Info"
        type="MultipleCalculation">
        <subsheetid>a5555e12-73c6-469e-9e8b-c38c22279bb2</subsheetid>
        <loginhibit onsuccess="true" />
        <display x="270" y="1680" />
        <font family="Tahoma" size="10" style="Regular" color="000000" />
        <steps>
            <calculation expression="[cItemData.Request Type (Select)]"
                stage="cRowsToAdd.Request Type (Select)" />
            <calculation expression="[cItemData.Mobile Number]" stage="cRowsToAdd.Mobile Number" />
            <calculation expression="[cItemData.SIM Number]" stage="cRowsToAdd.SIM Number" />
            <calculation expression="[cItemData.Full Bar                    (Add/Remove or N/A)]"
                stage="cRowsToAdd.Full Bar                    (Add/Remove or N/A)" />
            <calculation expression="[cItemData.GPRS Bar                    (Add/Remove or N/A)]"
                stage="cRowsToAdd.GPRS Bar                    (Add/Remove or N/A)" />
            <calculation expression="&quot;&quot;" stage="cRowsToAdd.Anovo Handset Info" />
        </steps>
    </stage>
</process>`;

    /**
     * Extract expressions from XML
     * @param {string} xmlString - The XML string to parse
     * @param {boolean} includeEmpty - Whether to include empty expressions
     * @param {string} prefix - The reference prefix to replace
     * @returns {Object} - Dictionary of extracted expressions
     */
    function extractExpressions(xmlString, includeEmpty, prefix) {
        // Parse the XML string
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        
        // Check for parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('XML parsing error: ' + parserError.textContent);
        }
        
        // Dictionary to hold the expressions
        const result = {};
        
        // Find all calculation elements
        const calculations = xmlDoc.querySelectorAll('calculation');
        
        // Create the reference pattern based on the custom prefix
        const prefixPattern = `[${prefix}.`;
        
        calculations.forEach(calc => {
            // Get the expression attribute
            const expression = calc.getAttribute('expression');
            
            // Handle empty expressions based on flag
            if (!expression) {
                return;
            }
            
            if (expression === '""' && !includeEmpty) {
                return;
            }
            
            // For non-empty expressions
            if (expression.includes(prefixPattern)) {
                // Extract the field name by removing prefix and suffix
                const fieldName = expression
                    .replace(prefixPattern, '')
                    .replace(']', '');
                    
                result[fieldName] = '';
            }
            // For literal expressions like ""
            else if (expression === '""' && includeEmpty) {
                // Get the target field name from the stage attribute
                const stage = calc.getAttribute('stage') || '';
                if (stage && stage.startsWith('cRowsToAdd.')) {
                    const fieldName = stage.replace('cRowsToAdd.', '');
                    result[fieldName] = '';
                }
            }
        });
        
        return result;
    }
    
    // Convert XML to JSON
    function convertToJson() {
        try {
            const xml = xmlInput.value.trim();
            if (!xml) {
                alert('Please enter XML content');
                return;
            }
            
            const includeEmpty = includeEmptyQuotes.checked;
            const pretty = prettyPrint.checked;
            const prefix = customPrefix.value.trim() || 'cItemData';
            
            const expressions = extractExpressions(xml, includeEmpty, prefix);
            
            // Format JSON output
            const jsonString = JSON.stringify(
                expressions, 
                null, 
                pretty ? 2 : 0
            );
            
            jsonOutput.value = jsonString;
        } catch (error) {
            alert('Error: ' + error.message);
            console.error(error);
        }
    }
    
    // Copy JSON to clipboard
    function copyToClipboard() {
        jsonOutput.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1500);
    }
    
    // Download JSON file
    function downloadJson() {
        const jsonString = jsonOutput.value;
        if (!jsonString) {
            alert('No JSON to download');
            return;
        }
        
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'expressions.json';
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
    
    // Load sample XML
    function loadSample() {
        xmlInput.value = sampleXml;
    }
    
    // Event listeners
    convertBtn.addEventListener('click', convertToJson);
    loadSampleBtn.addEventListener('click', loadSample);
    copyBtn.addEventListener('click', copyToClipboard);
    downloadBtn.addEventListener('click', downloadJson);
    
    // Enable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to convert
        if (e.ctrlKey && e.key === 'Enter') {
            convertToJson();
        }
    });
}); 