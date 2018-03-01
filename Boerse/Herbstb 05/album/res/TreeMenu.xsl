<?xml version='1.0'?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
      xmlns:msxsl="urn:schemas-microsoft-com:xslt"
      xmlns:user="http://www.oneilsoftware.com/mynamespace">
<xsl:include href="CommonJScriptFunctions.xsl" />
<xsl:output method = "xml"  indent = "yes" encoding="ISO-8859-1"/>
<xsl:key name="Index_key" match="Column/Attribute" use="DisplayValue" />

<xsl:template match="/">
<xsl:element name="Index">
    <xsl:for-each select = "//Parameters/IndexInfo/IndexColumn">
        <xsl:variable name="CurrentIndex" select="."></xsl:variable>
        <xsl:element name="node">
            <xsl:attribute name="label"><xsl:value-of select="$CurrentIndex" /></xsl:attribute>
            <xsl:attribute name="data"></xsl:attribute>
            <xsl:for-each select="//Images/Image/Columns/Column[@Name = $CurrentIndex]/Attribute[generate-id() = generate-id(key('Index_key', DisplayValue)[1])]">
         	   <xsl:sort select="DisplayValue"/>
        	   <xsl:value-of select="user:ResetPhotoCodedList()"/>
        	   <xsl:variable name="CurrentIndexValue" select="DisplayValue"></xsl:variable>
        	   <xsl:for-each select="//Images/Image[Columns/Column/@Name = $CurrentIndex and Columns/Column/Attribute/DisplayValue = $CurrentIndexValue]">
            	   <xsl:variable name="CurIndex" select="@DirectoryID"></xsl:variable>
            		<!-- Slow but effective way of finding absolute position of image -->
            	   <xsl:for-each select="//Images/Image">
            			<xsl:if test="@DirectoryID = $CurIndex">
            			   <xsl:value-of select="user:PutPhotoIntoCodedList(position())"/>
            			</xsl:if>
            		</xsl:for-each>
        	    </xsl:for-each>	
                <xsl:element name="node">
                    <xsl:attribute name="label"><xsl:value-of select="$CurrentIndexValue"/></xsl:attribute>
                    <xsl:attribute name="data"><xsl:value-of select="user:GetPhotoCodedList()"/></xsl:attribute>
                </xsl:element>
            </xsl:for-each>
        </xsl:element>
    </xsl:for-each>
</xsl:element>
</xsl:template>

</xsl:stylesheet>
