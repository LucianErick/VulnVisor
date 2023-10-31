### Installation:

Obs: You need to have Trivy installed on your machine

#### Vulnvisor install

- $ trivy plugin install <path to vulnvisor_vx.x.x_.tar.gz>

### Usage:

- $ trivy vulnvisor fs <path> --list-all-pkgs --dependency-tree --html-result <output>.html
- $ trivy vulnvisor image <image-name>:<version> --dependency-tree --html-result <output>.html

