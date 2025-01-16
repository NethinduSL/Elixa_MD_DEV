const config = require('../config');
const { cmd } = require('../command');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const authorizedNumbers = [...config.OWNER_NUMBER, "94763936166", "94766428832", "94770463141"];
const authorizedNumbers2 = ["94763936166", "94766428832", "94770463141"];

const handlePluginUpdate = async (conn, mek, m, { args, reply, senderNumber, repoURL, pluginsPath }) => {
    const updatePath = "./update";

    try {
        reply("🔄 Starting the update process...");

        if (fs.existsSync(updatePath)) {
            fs.removeSync(updatePath);
            console.log("Previous 'update' folder deleted.");
        }

        exec(`git clone --depth=1 ${repoURL} ${updatePath}`, (cloneError, cloneStdout, cloneStderr) => {
            if (cloneError) {
                console.error(`Error cloning repository: ${cloneError.message}`);
                return reply(`❌ Error: ${cloneError.message}`);
            }

            if (cloneStderr) {
                console.warn(`Warnings during clone: ${cloneStderr}`);
            }

            console.log(cloneStdout);

            const pluginName = args.join(" ");
            const filePath = path.join(updatePath, `${pluginName}.js`);

            if (fs.existsSync(filePath)) {
                fs.ensureDirSync(pluginsPath);
                const destPath = path.join(pluginsPath, `${pluginName}.js`);
                fs.copyFileSync(filePath, destPath);
                console.log(`Copied ${pluginName}.js to plugins folder.`);
                reply(`✅ ${pluginName}.js has been successfully installed.`);
            } else {
                reply(`❌ No file named ${pluginName}.js found in the repository.`);
            }

            if (fs.existsSync(updatePath)) {
                fs.removeSync(updatePath);
                console.log("Temporary 'update' folder deleted successfully.");
            }
        });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
};

cmd({
    pattern: "elixa",
    desc: "Add specific plugin from the repository",
    category: "owner",
    react: "💖",
    filename: __filename
}, async (conn, mek, m, { args, reply, senderNumber }) => {
    if (!authorizedNumbers.includes(senderNumber)) {
        return reply("❌ You are not authorized to use this command.");
    }

    await handlePluginUpdate(conn, mek, m, {
        args,
        reply,
        senderNumber,
        repoURL: "https://github.com/Eboxsl/Elixa-Plugins.git",
        pluginsPath: "./plugins"
    });
});

cmd({
    pattern: "e",
    desc: "Add specific plugin from the repository",
    category: "owner",
    react: "💖",
    filename: __filename
}, async (conn, mek, m, { args, reply, senderNumber }) => {
    if (!authorizedNumbers2.includes(senderNumber)) {
        return reply("❌ You are not authorized to use this command.");
    }

    await handlePluginUpdate(conn, mek, m, {
        args,
        reply,
        senderNumber,
        repoURL: "https://github.com/NethinduSL/pro.git",
        pluginsPath: "./plugins"
    });
});

cmd({
    pattern: "update",
    desc: "Update the Elix",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { reply, senderNumber }) => {
    if (!authorizedNumbers.includes(senderNumber)) {
        return reply("❌ You are not authorized to use this command.");
    }

    const updatePath = "./update";
    const pluginsPath = "./plugins";
    const repoURL = "https://github.com/Cyber-E2025/Mage-botaE";

    try {
        reply("🔄 Updating plugins...\nPlease wait...");

        if (fs.existsSync(updatePath)) {
            fs.removeSync(updatePath);
            console.log("Previous 'update' folder deleted.");
        }

        exec(`git clone --depth=1 ${repoURL} ${updatePath}`, (cloneError, cloneStdout, cloneStderr) => {
            if (cloneError) {
                console.error(`Error cloning repository: ${cloneError.message}`);
                return reply(`❌ Error: ${cloneError.message}`);
            }

            console.log(cloneStdout);

            if (fs.existsSync(pluginsPath)) {
                fs.removeSync(pluginsPath);
            }

            const newPluginsPath = path.join(updatePath, "plugins");
            if (fs.existsSync(newPluginsPath)) {
                fs.copySync(newPluginsPath, pluginsPath);
                reply("✅ Plugins updated successfully!");

                if (fs.existsSync(updatePath)) {
                    fs.removeSync(updatePath);
                }
            } else {
                reply("❌ Error: Plugins folder not found in the repository.");
            }
        });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});
