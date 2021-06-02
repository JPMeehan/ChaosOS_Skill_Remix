$module = Get-Content .\chaosos-skill-remix\module.json | ConvertFrom-Json
$version = $module.version
lessc "chaosos-skill-remix\chaosos-skill.less" "chaosos-skill-remix\chaosos-skill.css"
if (test-path .\archive\$version\chaosos-skill-remix.zip) {
    Remove-Item .\archive\$version\chaosos-skill-remix.zip
    Write-Output "Deleted old file"
}
Compress-Archive -Path .\chaosos-skill-remix -DestinationPath .\archive\$version\chaosos-skill-remix.zip
Copy-Item -Path .\LICENSE -Destination .\archive\$version
Copy-Item -Path .\README.md -Destination .\archive\$version
Write-Output "Freshened up the project to version $version"