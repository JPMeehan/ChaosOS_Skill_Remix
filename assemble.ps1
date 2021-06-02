$module = Get-Content .\Module\module.json | ConvertFrom-Json
$version = $module.version
lessc "Module\chaosos-skill.less" "Module\chaosos-skill.css"
if (test-path .\chaosos-skill-remix.zip) {
    Remove-Item .\chaosos-skill-remix.zip
    Write-Output "Deleted old file"
}
Compress-Archive -Path .\Module -DestinationPath .\chaosos-skill-remix.zip
# Copy-Item -Path .Module\LICENSE -Destination .\archive\$version
# Copy-Item -Path .Module\README.md -Destination .\archive\$version
Write-Output "Freshened up the project to version $version"